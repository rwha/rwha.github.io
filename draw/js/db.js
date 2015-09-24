var storage = (function(){
	
	var dDB = {};
	
	var datastore = null;
	
	dDB.open = function(callback) {
		var version = 2;
		var request = indexedDB.open('drawings', version);
		
		request.onupgradeneeded = function(e) {
			var odb = e.target.result;
			e.target.transaction.onerror = dDB.onerror;
			if(!odb.objectStoreNames.contains('projects')) {
				odb.createObjectStore('projects');
			}
		};
		
		request.onsuccess = function(e) {
			datastore = e.target.result;
			callback();
		};
		
		request.onerror = dDB.onerror;
		
	};
	
	dDB.getProjects = function(callback, alldata) {
		var db = datastore;
		var tx = db.transaction(['projects'], 'readwrite');
		var store = tx.objectStore('projects');
		var keyRange = IDBKeyRange.lowerBound(0);
		var cursor = store.openCursor();
		var projects = (alldata === true) ? {} : [];
		
		tx.oncomplete = function(e) {
			callback(projects);
		};
		
		cursor.onsuccess = function(e) {
			var result = e.target.result;
			if(!!result == false) {
				return;
			}
			if(alldata === true) {
				projects[result.key] = result.value;
			} else {
				projects.push(result.key);
			}
			result.continue();
		};
		
		cursor.onerror = dDB.onerror;
	};
	
	dDB.saveProject = function(name, data, callback) {
		var db = datastore;
		var tx = db.transaction(['projects'], 'readwrite');
		var store = tx.objectStore('projects');
		var save = store.put(data, name);
		
		save.onsuccess = function(e) {
			callback(name);
		};
		
		save.onerror = dDB.onerror;
		
	};
	
	dDB.openProject = function(name, callback) {
		var db = datastore;
		var tx = db.transaction(['projects'], 'readwrite');
		var store = tx.objectStore('projects');
		var open = store.get(name);
		
		open.onsuccess = function(e) {
			callback(name, open.result);
		}
		
		open.onerror = dDB.onerror;
	};
	
	dDB.deleteProject = function(name, callback) {
		var db = datastore;
		var tx = db.transaction(['projects'], 'readwrite');
		var store = tx.objectStore('projects');
		
		var req = store.delete(name);
		
		req.onsuccess = function(e) {
			callback();
		}
		
		req.onerror = function(e) {
			console.warn(e);
		}
	};
	
	dDB.onerror = function() {
		console.log('storage error: ', JSON.stringify(arguments));
	}
	
	return dDB;
}());