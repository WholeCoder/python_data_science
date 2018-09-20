# Implemented by Dmitry Zinoviev <dzinoviev@suffolk.edu>

import networkx as nx
import generalized

def test_generalized_similarity():
    """
    Calculate the generalized similarities between events and women 
    in the "classical" Southern Women graph.
    """

    graph = nx.davis_southern_women_graph()
    women, events, eps, iters = generalized.generalized_similarity(graph)

    print("Number of iterations:", iters)
    print("Attained precision:", eps)
    print("Event network:", len(events), "nodes")
    print("Least similar events:", 
          sorted(events.edges(data=True), key=lambda x: x[2]['weight'])[0][0:2])
    print("Women network:", len(women), "nodes")
    print("Least similar women:", 
          sorted(women.edges(data=True), key=lambda x: x[2]['weight'])[0][0:2])
    with open("examples/women.graphml","wb") as ofile:
        nx.write_graphml(women, ofile)
    with open("examples/events.graphml","wb") as ofile:
        nx.write_graphml(events, ofile)

test_generalized_similarity()
