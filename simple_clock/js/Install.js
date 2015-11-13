define(function() {
    function Install() {
		this.button = $('footer button#install');
    	this.manifest_url = location.href.substring(0, location.href.lastIndexOf("/")) + "/manifest.webapp";
    }

    Install.prototype.is_install = function() {
        var installCheck = navigator.mozApps.checkInstalled(this.manifest_url);
        installCheck.onsuccess = function() {
            if(installCheck.result) {
                this.button.hide();
            } else {
                this.button.click(this.install.bind(this));
            };
        }.bind(this);
    }

    Install.prototype.install = function(event) {
        event.preventDefault();
        var installLocFind = navigator.mozApps.install(this.manifest_url);
        installLocFind.onsuccess = function(data) {
        };
        installLocFind.onerror = function() {
            alert(installLocFind.error.name);
        };
    }

	Install.prototype.start = function() {
		if('mozApps' in navigator) {
			this.is_install();
		} else {
			this.button.hide();
		}
    }

    Install.start = function() {
        var install = new Install();
        install.start();
    }

    return Install;
});

