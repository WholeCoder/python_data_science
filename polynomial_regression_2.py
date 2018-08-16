import numpy as np
import pandas as pd
# function to calculate r-squared, MAE, RMSE
from sklearn.metrics import r2_score , mean_absolute_error, mean_squared_error
# importing linear regression function
import sklearn.linear_model as lm
import matplotlib.pyplot as plt

df = pd.read_csv('Data/Grade_Set_2.csv')
print df

df.plot(kind='scatter', x='Hours_Studied', y='Test_Grade', title='Grade vs Hours Studied')

print("Correlation matrix:  ")
print df.corr()

lr = lm.LinearRegression()

x = df.Hours_Studied[:, np.newaxis]
y= df.Test_Grade
lr.fit(x, y)

plt.scatter(x, y,  color='black')
plt.plot(x, lr.predict(x), color='blue', linewidth=3)
plt.title('Grade vs Hours Studied')
plt.ylabel('Test_Grade')
plt.xlabel('Hours_Studied')

print "R Squared: ", r2_score(y, lr.predict(x))
