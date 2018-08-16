from sklearn import datasets
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# create correlation matrix
# corr = iris.corr()
df = pd.read_csv("./Data/Grade_Set_1.csv")
print df

import statsmodels.api as sm





from pandas.tools.plotting import scatter_matrix

scatter_matrix(df, figsize=(10, 10))

# use suptitle to add title to all sublot
plt.suptitle("Scatter Matrix Plot", fontsize=20)
plt.show()
