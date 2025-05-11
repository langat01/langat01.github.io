# Import necessary libraries
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
import seaborn as sns

# Load the data
file_path = r'C:\Users\Admin\Downloads\Online Retail.xlsx'
df = pd.read_excel(file_path)

# Drop missing values
df = df.dropna()

# Create TotalSpend feature
df['TotalSpend'] = df['Quantity'] * df['UnitPrice']

# Select relevant features for clustering
features = df[['UnitPrice', 'Quantity', 'TotalSpend']]

# Standardize the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(features)

# Apply KMeans clustering
kmeans = KMeans(n_clusters=5, random_state=42)
df['Cluster'] = kmeans.fit_predict(X_scaled)

# Optional: Reduce dimensions with PCA for visualization
pca = PCA(n_components=2)
pca_result = pca.fit_transform(X_scaled)

df['PCA1'] = pca_result[:, 0]
df['PCA2'] = pca_result[:, 1]

# Plot clusters
plt.figure(figsize=(10, 6))
sns.scatterplot(x='PCA1', y='PCA2', hue='Cluster', data=df, palette='tab10')
plt.title('Customer Segments (PCA projection)')
plt.show()

# Group and summarize cluster characteristics
summary = df.groupby('Cluster')[['UnitPrice', 'Quantity', 'TotalSpend']].agg(['mean', 'count']).round(2)
print(summary)
from sklearn.metrics import silhouette_score
score = silhouette_score(X_scaled, df['Cluster'])
print(f'Silhouette Score: {score}')
df.to_csv('segmented_customers.csv', index=False)

