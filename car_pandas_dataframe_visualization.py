from sklearn import datasets
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
# %matplotlib inline

iris = datasets.load_iris()

df = pd.read_csv("./mtcars.csv")

# Let's convert to dataframe
# iris = pd.DataFrame(data= np.c_[iris['data'], iris['target']],
#                      columns= iris['feature_names'] + ['species'])

print df
# let's remove spaces from column name
# iris.columns = iris.columns.str.replace(' ','')

# replace the values with class labels
# iris.species = np.where(iris.species == 0.0, 'setosa', np.where(iris.species==1.0,'versicolor', 'virginica'))

# data dimension
# print(iris.shape)

# Peek at the 1st few records
# iris.head()
# plt.figsize(15, 8)
df.hist()

# plot histogram
plt.suptitle("Histogram", fontsize=16)

# use suptitle to add title to all sublots
plt.show()
df.boxplot()

# plot boxplot
plt.title("Bar Plot", fontsize=16)
plt.show()
