from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline

import pandas as pd
import numpy as np
from sklearn.metrics import r2_score
from sklearn import preprocessing

import sklearn.linear_model as lm
import matplotlib.pyplot as plt
import statsmodels.api as sm
from statsmodels.stats.outliers_influence import variance_inflation_factor

df = pd.read_csv('Data/Housing_Modified.csv')

independent_variables = ['price','lotsize','bedrooms','bathrms'
                        #,
                        # 'stories_one','stories_two','stories_three'
                        ]

# use the list to select a subset from original DataFrame
X = df[independent_variables]
y = df['price']

thresh = 10

for i in np.arange(0,len(independent_variables)):
    vif = [variance_inflation_factor(X[independent_variables].values, ix) for ix in range(X[independent_variables].shape[1])]
    maxloc = vif.index(max(vif))
    if max(vif) > thresh:
        print "vif :", vif
        print('dropping \'' + X[independent_variables].columns[maxloc] + '\' at index: ' + str(maxloc))
        del independent_variables[maxloc]
    else:
        break

print 'Final variables:', independent_variables
