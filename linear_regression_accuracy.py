import numpy as np
import pandas as pd
# function to calculate r-squared, MAE, RMSE
from sklearn.metrics import r2_score , mean_absolute_error, mean_squared_error
# importing linear regression function
import sklearn.linear_model as lm

# Create linear regression object
lr = lm.LinearRegression()

df = pd.read_csv('Data/Grade_Set_1.csv')

x= df.Hours_Studied[:, np.newaxis]
# independent variable
y= df.Test_Grade.values            # dependent variable

# add predict value to the data frame
lr.fit(x, y)
df['Test_Grade_Pred'] = lr.predict(x)

# Manually calculating R Squared
df['SST'] = np.square(df['Test_Grade'] - df['Test_Grade'].mean())
df['SSR'] = np.square(df['Test_Grade_Pred'] - df['Test_Grade'].mean())

print "Sum of SSR:", df['SSR'].sum()
print "Sum of SST:", df['SST'].sum()
print "R Squared using manual calculation: ", df['SSR'].sum() / df['SST'].sum()

# Using built-in function

print "R Squared using built-in function: ", r2_score(df.Test_Grade, y)
print "Mean Absolute Error: ", mean_absolute_error(df.Test_Grade, df.Test_Grade_Pred)
print "Root Mean Squared Error: ", np.sqrt(mean_squared_error(df.Test_Grade, df.Test_Grade_Pred))
