(function() {
    var viewer = new Miew({
        container: document.getElementsByClassName('miew-container')[0],
        load: '2CRN',
        reps: [{
            mode: 'LN',
        }, {
            selector: 'elem S',
        //   mode: 'BS', //idk what this is
            material: 'TR',
            colorer: ['UN', { color: 0xBADA55 }],
        }],
        settings: {
            autoRotation: 0, //-0.5 for spinning
            theme: "light",
            axes: true,
            fps: false,
            fog: false,
        },
    });

    console.log(viewer)

    const modes = Miew.modes.descriptions
    const colorers = Miew.colorers.descriptions

    colorers.forEach((color) => {
        var radioWrapper = document.createElement("div");
        var radioInput = document.createElement("input");
        radioInput.value = color.id;
        radioInput.type = "radio";
        radioInput.name = "color"
        radioInput.id = color.id;
        if (color.id == "EL") {
            radioInput.checked = true;
        }

        var radioLabel = document.createElement("label");
        radioLabel.htmlFor = color.id;

        radioInput.onclick = changeColor;

        var radioInputText = document.createTextNode(color.name);
        radioLabel.appendChild(radioInputText)
        radioWrapper.appendChild(radioInput);
        radioWrapper.appendChild(radioLabel);
        document.getElementById("miew-colorers").appendChild(radioWrapper);
    })

    modes.forEach((mode) => {
        var radioWrapper = document.createElement("div");
        var radioInput = document.createElement("input");
        radioInput.value = mode.id;
        radioInput.type = "radio";
        radioInput.name = "mode"
        radioInput.id = mode.id;
        if (mode.id == "LN") {
            radioInput.checked = true;
        }

        var radioLabel = document.createElement("label");
        radioLabel.htmlFor = mode.id;

        radioInput.onclick = changeMode;

        var radioInputText = document.createTextNode(mode.name);
        radioLabel.appendChild(radioInputText)
        radioWrapper.appendChild(radioInput);
        radioWrapper.appendChild(radioLabel);
        document.getElementById("miew-modes").appendChild(radioWrapper);
    })

    function changeColor() {
        var color = this.value;
        viewer.rep({colorer: color})
    }

    function changeMode() {
        var mode = this.value;
        viewer.rep({mode: mode})
    }

    document.getElementById("theme-light").addEventListener("click", function() {
        viewer.set("theme", "light")
    })

    document.getElementById("theme-dark").addEventListener("click", function() {
        viewer.set("theme", "dark")
    })

    document.getElementById("miew-reset-view").addEventListener("click", function() {
        viewer.resetView();
    })

    document.getElementById("miew-screenshot").addEventListener("click", function() {
        viewer.screenshotSave();
    })

    window.addEventListener('error', function(event) {
        console.log(event)
    })

    document.getElementById("miew-pdb-id").onsubmit = function(e){
        e.preventDefault();
        var value = document.getElementById("miew-pdb-id-input").value;

        viewer.load(value)
        document.getElementById("miew-current").innerHTML(value);
        // var url = 'http://files.rcsb.org/download/' + value + '.pdb';
        
        // var http = new XMLHttpRequest();
        // http.open('HEAD', url, false);
        // http.send();
        // if (http.status == 404) {
        //     alert( "  uhohhhhhhh, PDB id not found " )
        // } else {
        //     viewer.load(value)

        // }


    };


    if (viewer.init()) {
        viewer.run();
    }
    

    


    
})();