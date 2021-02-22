import sys

f= open("/etc/nginx/sites-available/default", "r")
content = f.read()
f.close()
server_name_tobe_replace = 'server_name _;'

server_name_replace_with = 'server_name '+ sys.argv[1] +';'

content = content.replace(server_name_tobe_replace, server_name_replace_with)

g= open("/etc/nginx/sites-available/default", "w")
g.write(content)
g.close()