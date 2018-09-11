tree.export_graphviz(clf, out_file='tree.dot')

from sklearn.externals.six import StringIO
import pydot
out_data = StringIO()

clf = tree.DecisionTreeClassifier(criterion = 'entropy', random_state=0)
clf.fit(X_train, y_train)

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

#print("entropy == ",entr)

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
