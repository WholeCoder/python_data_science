from sklearn import datasets
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

iris = datasets.load_iris()

print iris

iris = pd.DataFrame(data= np.c_[iris['data'], iris['target']],columns= iris['feature_names'] + ['species'])

print iris

# replace the values with class labels
iris.species = np.where(iris.species == 0.0, 'setosa', np.where(iris.species==1.0,'versicolor', 'virginica'))

# let's remove spaces from column name
iris.columns = iris.columns.str.replace(' ','')

print iris.describe()

print iris['species'].value_counts()





# plt.figsize(15, 8)
iris.hist()

# plot histogram
plt.suptitle("Histogram", fontsize=16)

# use suptitle to add title to all sublots
plt.show()
iris.boxplot()

# plot boxplot
plt.title("Bar Plot", fontsize=16)
plt.show()
