(function(){
    var data = window.__PRELOADED__;
    var pageData = data.page;
    var skills = pageData.skills.skill_list;
    var skillsArr = skills.split(",");
    var skillHTML = "";
    skillsArr.forEach(function(skill, i) {
        var skillParts = skill.split(":");
        if (skillParts.length == 2){
          var name = skillParts[0];
          var score = skillParts[1];
          skillHTML += '<div class="col-md-6 animate-box" data-animate-effect="fadeInLeft"><div class="progress-wrap"><h3>' +
                      name + '</h3><div class="progress"><div class="progress-bar color-' + (i+1) + '" role="progressbar" aria-valuenow="' +
                      score + '"aria-valuemin="0" aria-valuemax="100" style="width:' + score + '%"><span>' + score + '%</span></div></div></div></div>';
        }
    })
    $("#skills-content").html(skillHTML);
})()
