import pandas as pd
import matplotlib.pyplot as plt

# Load data
df = pd.read_csv('Data/Grade_Set_1.csv')
print df

# Simple scatter plot
df.plot(kind='scatter', x='Hours_Studied', y='Test_Grade', title='Grade vs Hours Studied')


# check the correlation between variables
print df.corr()
