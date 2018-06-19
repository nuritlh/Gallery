'use strict';

console.log('Starting up');

$(document).ready(function() {
  console.log('onload');
  var projs = createProjects();
  renderProjs(projs);

  //open modal
  $('#portfolio-Modal').on('show.bs.modal', function(event) {
    console.log('before modal opened');
    var button = $(event.relatedTarget);
    var projID = button.data('projid');
    var proj = getProjByID(projID);

    var modal = $(this);
    modal.find('.modal-body h2').text(proj.name);
    modal.find('.modal-body .p-title').text(proj.title);
    modal.find('.modal-body .desc').text(proj.desc);
    var date = new Date(proj.publishedAt);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var strDate = day + '-' + month + '-' + year;
    modal.find('.modal-body .Createdate').text('Create Date: ' + strDate);
    modal.find('.modal-body .labels-use').text(proj.labels);
    modal.find('.modal-body .proj-link').attr('href', './projs/' + proj.name);
    modal
      .find('.modal-body .img-fluid')
      .attr('src', 'img/portfolio/' + proj.name + '.PNG');
    modal.find('.modal-body .img-fluid').height(100);
    modal
      .find('.modal-body .modal-proj-pic')
      .attr('src', 'img/portfolio/' + proj.name + '-full.PNG');
  });
});

function renderProjs(projs) {
  var strHTMLs = projs.map(function(proj) {
    return `
    <div class="col-md-4 col-sm-6 portfolio-item">
    <a class="portfolio-link" data-toggle="modal" data-projid="${
      proj.id
    }" href="#portfolio-Modal">
      <div class="portfolio-hover">
        <div class="portfolio-hover-content">
          <i class="fa fa-plus fa-3x">
          </i>
        </div>        
      </div>
      <img class="img-fluid" src="img/portfolio/${proj.name}.PNG" alt="">
    </a>
    <div class="portfolio-caption">
      <h4>${proj.name}</h4>
      <p class="text-muted">${proj.title}</p>
    </div>
  </div>
  


    `;
  });

  document.querySelector('#proj-portfolio').innerHTML = strHTMLs.join('');
}

function onFormContactClicked(ev) {
  ev.preventDefault();
  var contactSubject = document.querySelector('#subject-mail').value;
  var contactbody = document.querySelector('#mail-massage-body').value;
  window.location.assign(
    `https://mail.google.com/mail/?view=cm&fs=1&to=nuritlh@gmail.com&su=${contactSubject}&body=${contactbody}`
  );
}
