//
// The following script defines a subset of the Bond graph (bond-graph.cypher)
// as a specialized hypergraph with included type definitions and relations.
//

MATCH (n)
DETACH DELETE n;

//
// Create some primitive types
//
CREATE (:Vertex {Value: 'StringType'});

CREATE (:Vertex {Value: 'IntegerType'});

//
// Create specific types
//

CREATE (:Vertex {Value: 'People'});

CREATE (:Vertex {Value: 'Vehicle'});

CREATE (:Vertex {Value: 'Film'});

CREATE (:Vertex {Value: 'Role'});

//
// Defines properties for specific types
//

MATCH (people:Vertex {Value: 'People'})
CREATE (nameProp:Vertex {Value: 'Name'})
MERGE (people)
  -[:EdgeOut]->(:Edge {Value: 'HAS_PROPERTY'})
  -[:EdgeIn]->(nameProp);

MATCH (vehicle:Vertex {Value: 'Vehicle'})
CREATE (brandProp:Vertex {Value: 'Brand'})
CREATE (modelProp:Vertex {Value: 'Model'})
MERGE (vehicle)
  -[:EdgeOut]->(:Edge {Value: 'HAS_PROPERTY'})
  -[:EdgeIn]->(brandProp)
MERGE (vehicle)
  -[:EdgeOut]->(:Edge {Value: 'HAS_PROPERTY'})
  -[:EdgeIn]->(modelProp);

MATCH (film:Vertex {Value: 'Film'})
CREATE (nameProp:Vertex {Value: 'Name'})
CREATE (yearProp:Vertex {Value: 'Year'})
CREATE (boxProp:Vertex {Value: 'Box'})
MERGE (film)
  -[:EdgeOut]->(:Edge {Value: 'HAS_PROPERTY'})
  -[:EdgeIn]->(nameProp)
MERGE (film)
  -[:EdgeOut]->(:Edge {Value: 'HAS_PROPERTY'})
  -[:EdgeIn]->(yearProp)
MERGE (film)
  -[:EdgeOut]->(:Edge {Value: 'HAS_PROPERTY'})
  -[:EdgeIn]->(boxProp);

MATCH (role:Vertex {Value: 'Role'})
CREATE (nameProp:Vertex {Value: 'Name'})
MERGE (role)
  -[:EdgeOut]->(:Edge {Value: 'HAS_PROPERTY'})
  -[:EdgeIn]->(nameProp);

//
// Add actors
//

MATCH (people:Vertex {Value: 'People'}),
      (string:Vertex {Value: 'StringType'})
CREATE (v:Vertex)
CREATE (name:Vertex {Value: 'Lee Tamahori'})
MERGE (v)
  -[:EdgeOut]->(hasName:Edge {Value: 'HAS_NAME'})
  -[:EdgeIn]->(name)
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(people)
MERGE (name)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(string);

MATCH (people:Vertex {Value: 'People'}),
      (string:Vertex {Value: 'StringType'})
CREATE (v:Vertex)
CREATE (name:Vertex {Value: 'Rosamund Pike'})
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'HAS_NAME'})
  -[:EdgeIn]->(name)
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(people)
MERGE (name)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(string);

MATCH (people:Vertex {Value: 'People'}),
      (string:Vertex {Value: 'StringType'})
CREATE (v:Vertex)
CREATE (name:Vertex {Value: 'Halle Berry'})
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'HAS_NAME'})
  -[:EdgeIn]->(name)
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(people)
MERGE (name)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(string);

MATCH (people:Vertex {Value: 'People'}),
      (string:Vertex {Value: 'StringType'})
CREATE (v:Vertex)
CREATE (name:Vertex {Value: 'Pierce Brosnan'})
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'HAS_NAME'})
  -[:EdgeIn]->(name)
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(people)
MERGE (name)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(string);

//
// Add vehicles
//

MATCH (vehicle:Vertex {Value: 'Vehicle'}),
      (string:Vertex {Value: 'StringType'})
CREATE (v:Vertex)
CREATE (brand:Vertex {Value: 'Jaguar'})
CREATE (model:Vertex {Value: 'XKR'})
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'HAS_BRAND'})
  -[:EdgeIn]->(brand)
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'IS_MODEL'})
  -[:EdgeIn]->(model)
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(vehicle)
MERGE (brand)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(string)
MERGE (model)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(string);

MATCH (vehicle:Vertex {Value: 'Vehicle'}),
      (string:Vertex {Value: 'StringType'})
CREATE (v:Vertex)
CREATE (brand:Vertex {Value: 'Aston Martin'})
CREATE (model:Vertex {Value: 'V12 Vanquish'})
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'HAS_BRAND'})
  -[:EdgeIn]->(brand)
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'IS_MODEL'})
  -[:EdgeIn]->(model)
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(vehicle)
MERGE (brand)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(string)
MERGE (model)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(string);

MATCH (vehicle:Vertex {Value: 'Vehicle'}),
      (string:Vertex {Value: 'StringType'}),
      (brand:Vertex {Value: 'Aston Martin'})
CREATE (v:Vertex)
CREATE (model:Vertex {Value: 'DBS V12'})
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'HAS_BRAND'})
  -[:EdgeIn]->(brand)
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'IS_MODEL'})
  -[:EdgeIn]->(model)
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(vehicle)
MERGE (model)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(string);

MATCH (vehicle:Vertex {Value: 'Vehicle'}),
      (string:Vertex {Value: 'StringType'}),
      (brand:Vertex {Value: 'Aston Martin'})
CREATE (v:Vertex)
CREATE (model:Vertex {Value: 'DB10'})
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'HAS_BRAND'})
  -[:EdgeIn]->(brand)
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'IS_MODEL'})
  -[:EdgeIn]->(model)
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(vehicle)
MERGE (model)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(string);

//
// Add film
//

MATCH (film:Vertex {Value: 'Film'}),
      (string:Vertex {Value: 'StringType'}),
      (integer:Vertex {Value: 'IntegerType'})
CREATE (v:Vertex)
CREATE (name:Vertex {Value: 'Die Another Day'})
CREATE (year:Vertex {Value: 2002})
CREATE (box:Vertex {Value: 543639638})
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'IS_NAMED'})
  -[:EdgeIn]->(name)
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'IS_RELEASED_IN'})
  -[:EdgeIn]->(year)
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'HAS_BOX'})
  -[:EdgeIn]->(box)
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(film)
MERGE (name)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(string)
MERGE (year)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(integer)
MERGE (box)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(integer);

//
// Add roles
//

MATCH (role:Vertex {Value: 'Role'}),
      (string:Vertex {Value: 'StringType'})
CREATE (v:Vertex)
CREATE (name:Vertex {Value: 'Miranda Frost'})
MERGE (v)
  -[:EdgeOut]->(hasName:Edge {Value: 'IS_CALLED'})
  -[:EdgeIn]->(name)
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(role)
MERGE (name)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(string);

MATCH (role:Vertex {Value: 'Role'}),
      (string:Vertex {Value: 'StringType'})
CREATE (v:Vertex)
CREATE (name:Vertex {Value: 'Giacinta Jinx Johnson'})
MERGE (v)
  -[:EdgeOut]->(hasName:Edge {Value: 'IS_CALLED'})
  -[:EdgeIn]->(name)
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(role)
MERGE (name)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(string);

MATCH (role:Vertex {Value: 'Role'}),
      (string:Vertex {Value: 'StringType'})
CREATE (v:Vertex)
CREATE (name:Vertex {Value: 'James Bond'})
MERGE (v)
  -[:EdgeOut]->(hasName:Edge {Value: 'IS_CALLED'})
  -[:EdgeIn]->(name)
MERGE (v)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(role)
MERGE (name)
  -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
  -[:EdgeIn]->(string);

//
// Assign actors to film
//

MATCH (film:Vertex)
        -[:EdgeOut]->(:Edge {Value: 'IS_NAMED'})
        -[:EdgeIn]->(:Vertex {Value: 'Die Another Day'}),
      (actor:Vertex)
        -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
        -[:EdgeIn]->(:Vertex {Value: 'People'})
MERGE (actor)
  -[:EdgeOut]->(:Edge {Value: 'HAS_ROLE_IN'})
  -[:EdgeIn]->(film);

//
// Specify roles
//

MATCH (actor:Vertex)
        -[:EdgeOut]->(:Edge {Value: 'HAS_NAME'})
        -[:EdgeIn]->(:Vertex {Value: 'Rosamund Pike'}),
      (actor)-[:EdgeOut]->(hasRoleProp:Edge {Value: 'HAS_ROLE_IN'}),
      (role:Vertex)
        -[:EdgeOut]->(:Edge {VALUE: 'IS_CALLED'})
        -[:EdgeIn]->(:Vertex {Value: 'Miranda Frost'})
MERGE (hasRoleProp)-[:MetaEdge {Value: 'HAS_ROLE'}]->(role);

MATCH (actor:Vertex)
        -[:EdgeOut]->(:Edge {Value: 'HAS_NAME'})
        -[:EdgeIn]->(:Vertex {Value: 'Halle Berry'}),
      (actor)-[:EdgeOut]->(hasRoleProp:Edge {Value: 'HAS_ROLE_IN'}),
      (role:Vertex)
        -[:EdgeOut]->(:Edge {VALUE: 'IS_CALLED'})
        -[:EdgeIn]->(:Vertex {Value: 'Giacinta Jinx Johnson'})
MERGE (hasRoleProp)-[:MetaEdge {Value: 'HAS_ROLE'}]->(role);

MATCH (actor:Vertex)
        -[:EdgeOut]->(:Edge {Value: 'HAS_NAME'})
        -[:EdgeIn]->(:Vertex {Value: 'Pierce Brosnan'}),
      (actor)-[:EdgeOut]->(hasRoleProp:Edge {Value: 'HAS_ROLE_IN'}),
      (role:Vertex)
        -[:EdgeOut]->(:Edge {VALUE: 'IS_CALLED'})
        -[:EdgeIn]->(:Vertex {Value: 'James Bond'})
MERGE (hasRoleProp)-[:MetaEdge {Value: 'HAS_ROLE'}]->(role);

//
// Assign vehicles to film
//

MATCH (film:Vertex)
        -[:EdgeOut]->(:Edge {Value: 'IS_NAMED'})
        -[:EdgeIn]->(:Vertex {Value: 'Die Another Day'}),
      (vehicle:Vertex)
        -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
        -[:EdgeIn]->(:Vertex {Value: 'Vehicle'}),
      (vehicle)
        -[:EdgeOut]->(:Edge {Value: 'IS_MODEL'})
        -[:EdgeIn]->(:Vertex {Value: 'V12 Vanquish'})
MERGE (vehicle)
  -[:EdgeOut]->(:Edge {Value: 'IS_PART_OF'})
  -[:EdgeIn]->(film);

MATCH (film:Vertex)
        -[:EdgeOut]->(:Edge {Value: 'IS_NAMED'})
        -[:EdgeIn]->(:Vertex {Value: 'Die Another Day'}),
      (vehicle:Vertex)
        -[:EdgeOut]->(:Edge {Value: 'INSTANCE_OF'})
        -[:EdgeIn]->(:Vertex {Value: 'Vehicle'}),
      (vehicle)
        -[:EdgeOut]->(:Edge {Value: 'IS_MODEL'})
        -[:EdgeIn]->(:Vertex {Value: 'XKR'})
MERGE (vehicle)
  -[:EdgeOut]->(:Edge {Value: 'IS_PART_OF'})
  -[:EdgeIn]->(film);

//
// Assign properties defined by edges to their properties in type definition
//

MATCH (e:Edge {Value: 'HAS_NAME'}),
      (:Vertex {Value: 'People'})
        -[:EdgeOut]->(:Edge {Value: 'HAS_PROPERTY'})
        -[:EdgeIn]->(prop:Vertex {Value: 'Name'})
MERGE (e)-[:MetaEdge {Value: 'CORRESPONDS_TO'}]-(prop);

MATCH (e:Edge {Value: 'HAS_BRAND'}),
      (:Vertex {Value: 'Vehicle'})
        -[:EdgeOut]->(:Edge {Value: 'HAS_PROPERTY'})
        -[:EdgeIn]->(prop:Vertex {Value: 'Brand'})
MERGE (e)-[:MetaEdge {Value: 'CORRESPONDS_TO'}]-(prop);

MATCH (e:Edge {Value: 'IS_MODEL'}),
      (:Vertex {Value: 'Vehicle'})
        -[:EdgeOut]->(:Edge {Value: 'HAS_PROPERTY'})
        -[:EdgeIn]->(prop:Vertex {Value: 'Model'})
MERGE (e)-[:MetaEdge {Value: 'CORRESPONDS_TO'}]-(prop);

MATCH (e:Edge {Value: 'IS_NAMED'}),
      (:Vertex {Value: 'Film'})
        -[:EdgeOut]->(:Edge {Value: 'HAS_PROPERTY'})
        -[:EdgeIn]->(prop:Vertex {Value: 'Name'})
MERGE (e)-[:MetaEdge {Value: 'CORRESPONDS_TO'}]-(prop);

MATCH (e:Edge {Value: 'IS_RELEASED_IN'}),
      (:Vertex {Value: 'Film'})
        -[:EdgeOut]->(:Edge {Value: 'HAS_PROPERTY'})
        -[:EdgeIn]->(prop:Vertex {Value: 'Year'})
MERGE (e)-[:MetaEdge {Value: 'CORRESPONDS_TO'}]-(prop);

MATCH (e:Edge {Value: 'HAS_BOX'}),
      (:Vertex {Value: 'Film'})
        -[:EdgeOut]->(:Edge {Value: 'HAS_PROPERTY'})
        -[:EdgeIn]->(prop:Vertex {Value: 'Box'})
MERGE (e)-[:MetaEdge {Value: 'CORRESPONDS_TO'}]-(prop);

MATCH (e:Edge {Value: 'IS_CALLED'}),
      (:Vertex {Value: 'Role'})
        -[:EdgeOut]->(:Edge {Value: 'HAS_PROPERTY'})
        -[:EdgeIn]->(prop:Vertex {Value: 'Name'})
MERGE (e)-[:MetaEdge {Value: 'CORRESPONDS_TO'}]-(prop);