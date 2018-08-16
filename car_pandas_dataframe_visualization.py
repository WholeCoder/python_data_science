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

print df.describe()



















# Multivarite analysis
# print the mean for each column by species
print df.groupby(by = "carb").mean()

# plot for mean of each feature for each label class
df.groupby(by = "carb").mean().plot(kind="bar")
plt.title('Class vs Measurements')
plt.ylabel('mean measurement(cm)')
plt.xticks(rotation=0)

# manage the xticks rotation
plt.grid(True)
# Use bbox_to_anchor option to place the legend outside plot area to be tidy
plt.legend(loc="upper left", bbox_to_anchor=(1,1))

plt.show()
