__author__ = 'ishaan'

from flash import app
from flask import render_template, session, request
import random
from words import WORDS
import json


@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        words = random.sample(WORDS, 10)
        session['ids'] = [w['id']-1 for w in words]
        print session['ids']
        return render_template('index.html', data=json.dumps(words))
    else:
        if not session.get('ids'):
            session['ids'] = []
        if len(session['ids']) >= len(WORDS):
            return json.dumps([])
        ids = range(1, len(WORDS)+1)
        for i in session['ids']:
            ids.remove(i)
        if len(ids) <= 10:
            rand_ids = ids
        else:
            rand_ids = random.sample(ids, 10)
        session['ids'] += rand_ids
        data = [WORDS[i-1] for i in rand_ids]
        return json.dumps(data)