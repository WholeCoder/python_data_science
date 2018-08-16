from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline

import pandas as pd
import numpy as np
from sklearn.metrics import r2_score

import sklearn.linear_model as lm
import matplotlib.pyplot as plt

lr = lm.LinearRegression()

df = pd.read_csv('Data/Grade_Set_2.csv')

x = df.Hours_Studied[:, np.newaxis]
y= df.Test_Grade

degree = 4
model = make_pipeline(PolynomialFeatures(degree), lr)

model.fit(x,y)

plt.scatter(x, y, color='black')
plt.plot(x, model.predict(x), color='green')
print "R Squared using built-in function: ", r2_score(y, model.predict(x))

plt.show()
