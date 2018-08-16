# importing linear regression function
import sklearn.linear_model as lm
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

df = pd.read_csv('Data/Grade_Set_1.csv')

# Create linear regression object
lr = lm.LinearRegression()

x= df.Hours_Studied[:, np.newaxis]

# independent variable
y= df.Test_Grade.values

# dependent variable# Train the model using the training sets
lr.fit(x, y)

print "Intercept: ", lr.intercept_
print "Coefficient: ", lr.coef_

# manual prediction for a given value of x
print "Manual prdiction :", 52.2928994083 + 4.74260355*6

# predict using the built-in function
print "Using predict function: ", lr.predict(6)

# plotting fitted line
plt.scatter(x, y,  color='black')
plt.plot(x, lr.predict(x), color='blue', linewidth=3)
plt.title('Grade vs Hours Studied')
plt.ylabel('Test_Grade')
plt.xlabel('Hours_Studied')

plt.show()
