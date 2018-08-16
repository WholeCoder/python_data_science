from sklearn import datasets
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# create correlation matrix
# corr = iris.corr()
df = pd.read_csv("./mtcars.csv")
corr = df.corr()

print(corr)

import statsmodels.api as sm
sm.graphics.plot_corr(corr, xnames=list(corr.columns))
plt.show()



from pandas.tools.plotting import scatter_matrix

scatter_matrix(df, figsize=(10, 10))

# use suptitle to add title to all sublot
plt.suptitle("Pair Plot", fontsize=20)
plt.show()
