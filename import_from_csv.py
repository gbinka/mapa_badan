# -*- coding: utf-8 -*-
import csv, json
from collections import Counter

file_name = 'src/data/mapa_dane.csv'
out_file = 'src/data/mapa_dane.json'
fields = ['_','__','title','titleEN','researchType','tags','author','team','placeName','placeNameEN','placeCoords','startYear','endYear','description','descriptionEN','grant','grantEN','URL1Description','URL1DescriptionEN','URL1','URL2Description','URL2DescriptionEN','URL2','URL3Description','URL3DescriptionEN','URL3','Photo1URL','Photo1Description','Photo2URL','Photo2Description','Photo3URL','Photo3Description','Photo4URL','Photo4Description']

data = []
tags = []
with open(file_name,'r') as fil:
    reader = csv.reader(fil)
    next(reader, None)
    for row in reader:
        pos = 0
        data_obj = {}
        for field in row:
            if fields[pos] == 'tags':
                field = [x.strip() for x in field.split(',')]
                tags.extend(field)
            if fields[pos] == 'researchType':
                if field == u'Badania studentów':
                    field = 'student'
                elif field == u'Badania doktorantów':
                    field = 'phd_student'
                else:
                    field = 'scientist'
            if fields[pos] == 'placeCoords':
                coords = field.split(',')
                field = {'lat':float(coords[0]), 'lng':float(coords[1])}
            data_obj[fields[pos]] = field
            pos+=1
        data.append(data_obj)
print(Counter(tags))
with open(out_file, 'w') as outfile:
    json.dump(data, outfile)

        
