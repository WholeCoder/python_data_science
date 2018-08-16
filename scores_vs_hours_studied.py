import pandas as pd
import matplotlib.pyplot as plt
# %matplotlib inline

# Load data
df = pd.read_csv('Data/Grade_Set_1.csv')
print df

# Simple scatter plot
df.plot(kind='scatter', x='Hours_Studied', y='Test_Grade', title='Grade vs Hours Studied')

# check the correlation between variablesPrint
df.corr()
plt.show()
