console.log('SCRIPTS')

document.querySelector('#sortInput').onchange = function () {
        let val = this.value.trim();
        let elasticItems = document.querySelectorAll('#sortInput option');
        if (val != '') {
            elasticItems.forEach(function (elem) {
                if (elem.innerText.search((RegExp(val,"gi"))) == -1) {
                    elem.classList.add('hide');
                }
                else {
                    elem.classList.remove('hide');
                }
            });
        }
        else {
              elasticItems.forEach(function (elem) {
               
                    elem.classList.remove('hide');
                
              });
        }
    }