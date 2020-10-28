function Form(el) {
  this.initialize(el);
}

Form.prototype.initialize = function(el) {
  this.$window = $(window);
  this.$document = $(document);
  this.handleEvents();
};

Form.prototype.handleEvents = function() {
  var self = this;

  this.$document.on("click", "#form-contact .confirm", function(e) {
    self.validation();
  });

  this.$document.on("click", "#form-contact .submit", function(e) {
    self.sendContact();
  });
};

Form.prototype.validation = function() {
  var self = this;
  var validate = 0;
  $(
    'input[type="text"], input[type="email"], textarea'
  ).each(function() {
    if (self.isset($(this).attr("required"))) {
      if (!self.isset($(this).val())) {
        validate += 1;
        $(this).addClass("error");
      }
    }

    if (self.isset($(this).attr("maxlength"))) {
      if ($(this).val().length > $(this).attr("maxlength")) {
        validate += 1;
        $(this).addClass("error");
      }
    }

    if ($(this).attr("type") == "email") {
      if (
        !$(this)
          .val()
          .match(/^[A-Za-z0-9]+[\w\.-]+@[A-Za-z0-9]+[\w\.-]+\.\w{2,}$/)
      ) {
        validate += 1;
        $(this).addClass("error");
      }
    }
  });

  if (validate > 0) {
    return false;
  } else {
    return true;
  }
};

Form.prototype.sendContact = function() {
  var self = this;
  // フォームデータ作成
  let data = new FormData();
  // data.append(name属性, 値);
  data.append("name", $('#form-contact input[name="name"]').val());
  data.append("email", $('#form-contact input[name="email"]').val());
  data.append("content", $('#form-contact input[name="content"]').val());
  data.append("token", $('#form-contact input[name="token"]').val());

  // フォームデータ送信
  $.ajax({
    url: "contact.php",
    data: data,
    processData: false,
    contentType: false,
    type: "POST"
  })
    .done(function(data) {
      alert("成功!", data);
    })
    .fail(function(data) {
      alert("失敗!", data);
    });
};

Form.prototype.isset = function(data) {
  var self = this;
  if (data === "" || data === null || data === undefined || data === false) {
    return false;
  } else {
    return true;
  }
};

var form = new Form();
