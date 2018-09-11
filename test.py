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

df = pd.read_csv('Data/OmniCleanTshirtPreferencesTargetAudience.csv')

# create a Python list of feature names
independent_variables =  ['Design1thisisyou','Design2d2c','Design3dd','Design4ddgaf','Design5ehh','Design6pork','Design7allow','Design8yes','Design9prop65','Design10pants','Design11secret','Design12rush','Design13skank88','Design14blank','Design15yes']
# use the list to select a subset from original DataFrame
X = df[independent_variables]
y = df['Design16Clothing']

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
