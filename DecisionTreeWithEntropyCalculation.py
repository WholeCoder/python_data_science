import warnings
warnings.filterwarnings('ignore')

from matplotlib.colors import ListedColormap
import matplotlib.pyplot as plt
%matplotlib inline

from sklearn import datasets
import numpy as np
import pandas as pd
from sklearn import tree
from sklearn import metrics

iris = datasets.load_iris()

# X = iris.data[:, [2, 3]]
X = iris.data
y = iris.target

print('Class labels:', np.unique(y))

#Normalize data: the unit of measurement might differ so lets normalize the data before building the model

from sklearn.preprocessing import StandardScaler

sc = StandardScaler()
sc.fit(X)
X = sc.transform(X)

#Split data into train and test. When ever we are using radom function its advised to use a seed to ensure the reproducibility of the results.

# split data into train and test
from sklearn.cross_validation import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0)

def plot_decision_regions(X, y, classifier):

    h = .02  # step size in the mesh
    # setup marker generator and color map
    markers = ('s', 'x', 'o', '^', 'v')
    colors = ('red', 'blue', 'lightgreen', 'gray', 'cyan')
    cmap = ListedColormap(colors[:len(np.unique(y))])

    # plot the decision surface
    x1_min, x1_max = X[:, 0].min() - 1, X[:, 0].max() + 1
    x2_min, x2_max = X[:, 1].min() - 1, X[:, 1].max() + 1
    xx1, xx2 = np.meshgrid(np.arange(x1_min, x1_max, h),
                           np.arange(x2_min, x2_max, h))
    Z = classifier.predict(np.array([xx1.ravel(), xx2.ravel()]).T)
    Z = Z.reshape(xx1.shape)
    plt.contourf(xx1, xx2, Z, alpha=0.4, cmap=cmap)
    plt.xlim(xx1.min(), xx1.max())
    plt.ylim(xx2.min(), xx2.max())

    for idx, cl in enumerate(np.unique(y)):
        plt.scatter(x=X[y == cl, 0], y=X[y == cl, 1],
                    alpha=0.8, c=cmap(idx),
                    marker=markers[idx], label=cl)

clf = tree.DecisionTreeClassifier(criterion = 'entropy', random_state=0)
clf.fit(X_train, y_train)

# generate evaluation metrics
print "Train - Accuracy :", metrics.accuracy_score(y_train, clf.predict(X_train))
print "Train - Confusion matrix :",metrics.confusion_matrix(y_train, clf.predict(X_train))
print "Train - classification report :", metrics.classification_report(y_train, clf.predict(X_train))

print "Test - Accuracy :", metrics.accuracy_score(y_test, clf.predict(X_test))
print "Test - Confusion matrix :",metrics.confusion_matrix(y_test, clf.predict(X_test))
print "Test - classification report :", metrics.classification_report(y_test, clf.predict(X_test))

### Visualize Decision Tree


import warnings
warnings.filterwarnings('ignore')

from sklearn import tree
tree.export_graphviz(clf, out_file='tree.dot')

from sklearn.externals.six import StringIO
import pydot
out_data = StringIO()

count0 = 0.0
for n in range(len(X_train)):
    if X_train[n][0] <= -0.59:
        count0 += 1.0
print("count0 <=-0.59 on [0] == ",count0)
count1 = 0.0
for n in range(len(X_train)):
    if X_train[n][1] <= -0.59:
        count1 += 1.0
print("count1 <=-0.59 on [1] == ",count1)

count2 = 0.0
for n in range(len(X_train)):
    if X_train[n][2] <= -0.59:
        count2 += 1.0
print("count2 <=-0.59 on [2] == ",count2)

count3 = 0.0
for n in range(len(X_train)):
    if X_train[n][3] <= -0.59:
        count3 += 1.0
print("count3 <=-0.59 on [3] == ",count3)

divide_by_count = count0+count1+count2#+count3
print ("divide_by_count == ",divide_by_count)
from math import log
print count0/divide_by_count
entr = -(count0/divide_by_count*log(count0/divide_by_count)/log(2.0)+ count1/divide_by_count*log(count1/divide_by_count)/log(2.0)+ count2/divide_by_count*log(count2/divide_by_count)/log(2.0))#+ count3/divide_by_count*log(count3/divide_by_count)/log(2.0))

# print("Total count == ", count0+count1+count2)
print("len(X_train) == ", len(X_train))
print("entropy == ",entr)

tree.export_graphviz(clf, out_file=out_data,
                    feature_names=iris.feature_names,
                    class_names=clf.classes_.astype(int).astype(str),
                    filled=True, rounded=True,
                    special_characters=True,
                    node_ids=1,)
graph = pydot.graph_from_dot_data(out_data.getvalue())
graph[0].write_pdf("iris.pdf")  # save to pdf

from IPython.display import IFrame
IFrame("iris.pdf", width=600, height=300)
