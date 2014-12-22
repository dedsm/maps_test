maps_test
=========

Google maps sample app


## Tools used ##

### Backend ###

* Django (Python Web Framework)
* Django Rest Framework (REST Framework on top of Django)
* Postgis (Spatial and Geographic objects for PostgreSQL)

### Frontend ###

* Angularjs (Javascript Framework)
* Bootstrap (HTML Framework)
* angular-ui-router ( State based routing in angular )
* angular-restmod ( ORM in angular )
* angularjs-toaster ( Notification system in angular )



## API Description ##

The API is really simple, it only has one /areas/ REST Resource

The list call can receive a location and it'll return the service areas that contain it.
It can also receive a last parameter and it'll return the last n service areas created.

The Area Resource contains a name and a poly, poly is the GEOJson representation of the area.


## Aplication usage ##

The application consists of two pages, one for drawing and storing a service area, and the other to find
service areas that contain certain location.

### Drawing page ###

To draw a new area, just click on the blue "Draw new service area" button and draw a shape in the map,
once you finish it, you can check all the coordinates it generated for that shape, give it a name and save it.

You can clear the map if the shape is not what you want and start over.

There's a checkbox that when enabled, consults the backend and retrieves the latest service areas created in the system.

### Query page ###

To see if there's a service area for a specific location, you can search for the location and just click on the map,
the system will search all service areas that contain that location and it'll display them on the map as well as in the list below.
