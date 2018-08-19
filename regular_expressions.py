import re

pattern = re.compile(r'\bfoo\b') # \b matches the boundary of a word
if pattern.match("foo bar"):
    print("\\b matches the boundary of a word")


pattern = re.compile("\\\\") # \\ = \ to search for.  \ is escaped
if pattern.match("\\author"):
    print( "\\\\ = \\ to search for.  \\ is escaped" )

pattern = re.compile(r"\\")
if pattern.match(r"\author"):
    print( "matched nothing" ) # match nothing eg3.py

pattern = re.compile(r'<HTML>')
if pattern.match("<HTML>"):
    print( "matched <HTML>")# eg4.py

if re.match(r'<HTML>', "<HTML>"):
    print( "<HTML> matched") #eg5.py

pattern = re.compile(r'<HTML>')
if (pattern.match("<HTML><head>")):
    print( " matched <HTML>")# eg6.py

pattern = re.compile(r'<HTML>')
if pattern.match(" <HTML>"):
    print( " found <HTML> matched")
else:
    print( "didn't find <HTML>")
result = re.search(r'<HTML>', " <HTML>")
if result: # eg7.py
    print "matched **", result.group(0), "**"

pattern = re.compile(r'<HTML>')
if pattern.match("  <HTML>"):
    print "matched <HTML>"
else:
    print "didn't match <HTML>"

if pattern.match("  <HTML>", 2): # eg8.py
    print( "matched  <HTML> offset by 2")


pattern = re.compile(r'^<HTML>') # eg9.py
if pattern.match("<HTML>"):
    print( "found <HTML> at very beginning of the line")
else:
    print( "Didn't find <HTML> at very beginning of line.")

if pattern.match("  <HTML>",  2): # eg10.py
    print("offset by 2 <HTML> matched at beginning of line offset by 2")


pattern = re.compile(r'<HTML>') eg11.py
pattern.match("<HTML>"[:2])
pattern.match("<HTML>", 0, 2)
