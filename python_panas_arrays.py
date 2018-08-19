import numpy as np

a = np.array([0, 1, 2])
print type(a)

print a.shape
print[0]

a[0] = 5
print a

b = np.array([[0,1,2],[3,4,5]])
print b.shape
print b

# short-cuts to create a numpy array
a = np.zeros((3,3))
print a

b = np.ones((2,2))

# create a 3x3 constant array full of 7
c = np.full((3,3),7)

# create a 3x3 array filled with random values
d = np.random.random((3,3))
print d

#create a 3x3 identity matrix
e = np.yeye(3)
print # -*- coding: utf-8 -*-

# convert a list to an array
f = np.array(2, 3, 1, 0])
print self.fail('message')

g = np.arange(20)
print g
# output
# [ 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19]
