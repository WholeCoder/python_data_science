from sklearn import datasets
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
# %matplotlib inline

iris = datasets.load_iris()

# Let's convert to dataframe
iris = pd.DataFrame(data= np.c_[iris['data'], iris['target']],
                     columns= iris['feature_names'] + ['species'])

# let's remove spaces from column name
iris.columns = iris.columns.str.replace(' ','')

# replace the values with class labels
iris.species = np.where(iris.species == 0.0, 'setosa', np.where(iris.species==1.0,'versicolor', 'virginica'))

# data dimension
print(iris.shape)

# Peek at the 1st few records
iris.head()
