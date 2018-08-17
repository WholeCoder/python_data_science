from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline

import pandas as pd
import numpy as np
from sklearn.metrics import r2_score
from sklearn import preprocessing, metrics

import sklearn.linear_model as lm
import matplotlib.pyplot as plt
import statsmodels.api as sm
from statsmodels.stats.outliers_influence import variance_inflation_factor
from pprint import pprint

df = pd.read_csv('Data/grades.csv')

# create a Python list of feature names
independent_variables =  ['Hours_Studied','Test_Grade']
# use the list to select a subset from original DataFrame
X = df[independent_variables]
y = df['Test_Grade_Final']

# Split your data set into 80/20 for train/test datasets
from sklearn.cross_validation import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=.80, random_state=1)

# create a fitted model & print the summary
# lm = sm.OLS(y_train, X_train).fit()
lm = sm.OLS(y, X.astype(int)).fit()
print lm.summary()

# make predictions on the testing set
y_train_pred = lm.predict(X_train)
y_test_pred = lm.predict(X_test)

print "Train MAE: ", metrics.mean_absolute_error(y_train, y_train_pred)
print "Train RMSE: ", np.sqrt(metrics.mean_squared_error(y_train, y_train_pred))
print "Test MAE: ", metrics.mean_absolute_error(y_test, y_test_pred)
print "Test RMSE: ", np.sqrt(metrics.mean_squared_error(y_test, y_test_pred))
# Find outliers ## Bonferroni outlier test
test = lm.outlier_test()

print test.__class__.__name__
# print test[["Test_Grade_Final"]]
# test = test[["bonf(p)"]]
print df.shape
# l = dir(test)
# pprint(l)

print test

# s.get_value(dates[5])

print 'Bad data points (bonf(p) < 0.05):'

for index, row in test.iterrows():
    if row['bonf(p)'] < 0.05:
        print(row['bonf(p)'])
