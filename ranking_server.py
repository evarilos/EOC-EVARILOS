#!/usr/bin/env python

from flask import Flask
from flask import render_template
from urlparse import urlparse, parse_qs
import urllib, json
from flask import request

app = Flask(__name__)

@app.route('/')
def ranking():
    return render_template('ranking.html')


@app.route('/details',methods=['GET'])
def details():
	searchword = request.args.get('id')
	db = request.args.get('db')
	
	return render_template('details.html',id=searchword,db=db)


@app.route('/fetch',methods=['GET'])
def fetchUri():
	searchword = request.args.get('url')

	response = urllib.urlopen(searchword);
	data = json.loads(response.read())
	return json.dumps(data)

if __name__ == '__main__':
    app.run('0.0.0.0', 5011, debug=True)
