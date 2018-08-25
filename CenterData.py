import pandas as pd
url = "./Data/OmniCleanTshirtPreferencesTargetAudience.csv"
# load dataset into Pandas DataFrame
df = pd.read_csv(url, header=1,names=['Age','Design1thisisyou','Design2d2c','Design3dd','Design4ddgaf'])
df.head()
from sklearn.preprocessing import StandardScaler
features = ['Age','Design1thisisyou','Design2d2c','Design3dd','Design4ddgaf']
# Separating out the features
x = df.loc[:, features].values
# Separating out the target
#y = df.loc[:,['target']].values
# Standardizing the features
x = StandardScaler().fit_transform(x)
print x