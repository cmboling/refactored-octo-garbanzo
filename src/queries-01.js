//Title Mapping
db.generalAppCollection.find({   "book_title" : {      $exists : true,      $ne : ""   },   "deleted_at": {$exists: false}})
//Then in Excel, highlight the bonus and feature columns and use Excel's remove duplicates function.

//Users in a User Group
db.generalAppCollection.find({ groups:{ $in:[<insert comma delimited ObjectIds here>] } })

//Latest Login of a User
db.generalAppCollection.find({user: <insert email in lowercase here>, action:"login"}).sort({"created_at": -1}).limit(1)

//Ascending List of Current User Groups
db.generalAppCollection.find({type:'group'}).sort({'description':1})

//generalAppCollection ids with field status not completed
db.generalAppCollection.find({   "field.field0": {$nin:['COMPLETED']},   "field.field1": {$exists: false}}).count()

//generalAppCollection ids tagged with a Rarely Used Field
db.generalAppCollection.find({	
	field0:{$nin:[null,""]},	
	field1:{$exists:false}},
	{
		<propagate fields here>
	})

//Distinct Fields in App
db.generalAppCollection.distinct("field")

//Finding Particular IDs
//This shows particular generalAppCollection ids that you want to see in an App:
db.generalAppCollection.find({_id:{$in:[<insert ObjectId()s here>]}})

//Find current fields and flattening out attributes
//Understanding the "unwind" modifier: Imagine each record in the search results to have one of the elements in the unwinded field.
//Understanding what _id:0 means: You can explicitly tell mongo to not project the _id field. _id is projected by default. You can set it to 0 (false).
db.generalAppCollection.aggregate(
     { $unwind: "$fields" },
     { $project: {
   _id:0,
      name:1,
      "fields.fieldName":1,
      "fields.fieldId":1
     }
    } 
);