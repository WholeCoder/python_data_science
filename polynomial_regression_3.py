import numpy as np
import pandas as pd
# function to calculate r-squared, MAE, RMSE
from sklearn.metrics import r2_score , mean_absolute_error, mean_squared_error
# importing linear regression function
import sklearn.linear_model as lm
import matplotlib.pyplot as plt

df = pd.read_csv('Data/Grade_Set_2.csv')
print df

lr = lm.LinearRegression()

x = df.Hours_Studied
y = df.Test_Grade

for deg in [1, 2, 3, 4, 5]:
    lr.fit(np.vander(x, deg + 1), y);
    y_lr = lr.predict(np.vander(x, deg + 1))
    plt.plot(x, y_lr, label='degree ' + str(deg));
    plt.legend(loc=2);
    print r2_score(y, y_lr)

plt.plot(x, y, 'ok')
plt.show()
