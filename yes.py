import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import streamlit as st
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib
from io import BytesIO

# Configure Streamlit page
st.set_page_config(
    page_title="✈️ Turbofan Predictive Maintenance",
    page_icon="✈️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
<style>
    .metric-card {
        background-color: #f0f2f6;
        border-radius: 10px;
        padding: 15px;
        margin-bottom: 15px;
    }
    .prediction-alert {
        padding: 15px;
        border-radius: 5px;
        margin: 10px 0px;
        font-weight: bold;
    }
    .safe {
        background-color: #d4edda;
        color: #155724;
    }
    .warning {
        background-color: #fff3cd;
        color: #856404;
    }
    .danger {
        background-color: #f8d7da;
        color: #721c24;
    }
</style>
""", unsafe_allow_html=True)

# Title and description
st.title("✈️ Turbofan Engine Predictive Maintenance Dashboard")
st.markdown("Predict equipment failures before they occur using NASA's Turbofan Engine Degradation Simulation Data.")

# Data loading and preprocessing
@st.cache_data
def load_and_preprocess(uploaded_file):
    try:
        if uploaded_file is not None:
            df = pd.read_csv(uploaded_file, sep="\s+", header=None, engine='python').dropna(axis=1)
        else:
            file_path = "train_FD001.txt"
            df = pd.read_csv(file_path, sep="\s+", header=None, engine='python').dropna(axis=1)

        # Add column names
        columns = ["engine_id", "cycle", "op_setting1", "op_setting2", "op_setting3"] + \
                [f"sensor_{i:02d}" for i in range(1, 22)]
        df.columns = columns[:len(df.columns)]

        # RUL calculation
        max_cycle = df.groupby('engine_id')['cycle'].max().rename('max_cycle')
        df = df.merge(max_cycle, left_on='engine_id', right_index=True)
        df['RUL'] = df['max_cycle'] - df['cycle']
        df['failure'] = (df['RUL'] <= 30).astype(int)

        # Important sensors
        important_sensors = [f"sensor_{i:02d}" for i in [2,3,4,7,8,9,11,12,13,14,15,17,20,21]]

        return df, important_sensors

    except Exception as e:
        st.error(f"Error loading data: {str(e)}")
        return None, None

# Model training function
@st.cache_resource
def train_model(X_train, y_train):
    model = RandomForestClassifier(
        n_estimators=150,
        max_depth=12,
        min_samples_split=5,
        class_weight='balanced',
        random_state=42
    )
    model.fit(X_train, y_train)
    return model

# Main application
def main():
    # Sidebar upload
    st.sidebar.markdown("### Upload Engine Data")
    uploaded_file = st.sidebar.file_uploader("Upload train_FD001.txt file", type=["txt"])

    # Load and preprocess
    with st.spinner('Loading and preprocessing engine data...'):
        df, important_sensors = load_and_preprocess(uploaded_file)

        if df is None:
            st.stop()

        X = df[important_sensors]
        y = df['failure']
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train model
    with st.spinner('Training predictive model...'):
        model = train_model(X_train, y_train)
        accuracy = model.score(X_test, y_test)

    # Dashboard Tabs
    tab1, tab2, tab3 = st.tabs(["📊 Dashboard", "🔍 Engine Inspector", "⚙️ Data & Model"])

    with tab1:
        st.header("Fleet Health Overview")
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Total Engines", len(df['engine_id'].unique()))
        with col2:
            st.metric("Failure Rate", f"{df['failure'].mean()*100:.1f}%")
        with col3:
            st.metric("Model Accuracy", f"{accuracy*100:.1f}%")

        fig_col1, fig_col2 = st.columns(2)
        with fig_col1:
            st.subheader("Failure Distribution")
            fig1, ax1 = plt.subplots()
            df['failure'].value_counts().plot.pie(
                autopct='%1.1f%%',
                colors=['#4CAF50', '#F44336'],
                labels=['Normal', 'Failure'],
                startangle=90,
                ax=ax1
            )
            ax1.set_ylabel('')
            st.pyplot(fig1)

        with fig_col2:
            st.subheader("Remaining Useful Life")
            fig2, ax2 = plt.subplots()
            df['RUL'].hist(bins=30, color='#2196F3', ax=ax2)
            ax2.axvline(30, color='red', linestyle='--', label='Failure Threshold')
            ax2.set_xlabel('Remaining Cycles')
            ax2.set_ylabel('Engine Count')
            ax2.legend()
            st.pyplot(fig2)

        st.subheader("Critical Sensor Importance")
        fig3, ax3 = plt.subplots(figsize=(10, 6))
        sorted_idx = model.feature_importances_.argsort()
        ax3.barh(
            np.array(important_sensors)[sorted_idx],
            model.feature_importances_[sorted_idx],
            color='#FF9800'
        )
        ax3.set_xlabel('Importance Score')
        st.pyplot(fig3)

    with tab2:
        st.header("Individual Engine Analysis")
        engine_id = st.selectbox("Select Engine ID", options=sorted(df['engine_id'].unique()), index=0)

        if engine_id:
            engine_data = df[df['engine_id'] == engine_id].iloc[-1]
            prediction = model.predict([engine_data[important_sensors]])[0]
            proba = model.predict_proba([engine_data[important_sensors]])[0][1]

            if prediction:
                alert_class = "danger"
                status = "IMMINENT FAILURE"
                suggestion = "Schedule maintenance immediately"
            else:
                if engine_data['RUL'] < 50:
                    alert_class = "warning"
                    status = "WARNING"
                    suggestion = "Monitor closely"
                else:
                    alert_class = "safe"
                    status = "NORMAL"
                    suggestion = "No action required"

            st.markdown(
                f"""
                <div class="prediction-alert {alert_class}">
                    <h3>Engine Status: {status}</h3>
                    <p>{suggestion}</p>
                    <p>Failure probability: {proba*100:.1f}%</p>
                </div>
                """,
                unsafe_allow_html=True
            )

            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric("Current Cycle", engine_data['cycle'])
            with col2:
                st.metric("Remaining Useful Life", f"{int(engine_data['RUL'])} cycles")
            with col3:
                st.metric("Operation Settings", f"{engine_data['op_setting1']:.1f}")

            st.subheader("Sensor Trends")
            engine_history = df[df['engine_id'] == engine_id]
            selected_sensors = st.multiselect(
                "Select sensors to display",
                options=important_sensors,
                default=important_sensors[:3]
            )

            if selected_sensors:
                fig4, ax4 = plt.subplots(figsize=(10, 5))
                for sensor in selected_sensors:
                    ax4.plot(engine_history['cycle'], engine_history[sensor], label=sensor)
                ax4.axvline(engine_history['cycle'].max() - 30, color='red', linestyle='--', label='Failure threshold')
                ax4.set_xlabel('Operation Cycles')
                ax4.set_ylabel('Sensor Values')
                ax4.legend()
                ax4.grid(True)
                st.pyplot(fig4)

    with tab3:
        st.header("Data & Model Management")
        st.subheader("Export Data")
        st.download_button(
            label="Download Processed Data (CSV)",
            data=df.to_csv(index=False).encode('utf-8'),
            file_name="turbofan_engine_data.csv",
            mime="text/csv"
        )

        st.subheader("Export Model")
        model_bytes = BytesIO()
        joblib.dump(model, model_bytes)
        model_bytes.seek(0)

        st.download_button(
            label="Download Trained Model (PKL)",
            data=model_bytes,
            file_name="turbofan_failure_model.pkl",
            mime="application/octet-stream"
        )

        st.subheader("Model Information")
        st.json({
            "model_type": "Random Forest Classifier",
            "accuracy": float(accuracy),
            "important_features": important_sensors,
            "training_date": pd.Timestamp.now().strftime("%Y-%m-%d")
        })

if __name__ == "__main__":
    main()
