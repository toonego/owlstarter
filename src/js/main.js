//import hello from './jquery.photoswipe';

//メディアクエリ
var breakPoint = window.matchMedia("screen and (max-width: 767px)");

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
};

Form.prototype.validation = function() {
  var self = this;
  var validate = 0;
  $('input[type="text"], input[type="email"], textarea').each(function() {
    $(this)
      .closest("dd")
      .removeClass("error empty max email");

    if (self.isset($(this).attr("required"))) {
      if (!self.isset($(this).val())) {
        validate += 1;
        $(this)
          .closest("dd")
          .addClass("error empty");
      }
    }

    if (self.isset($(this).attr("maxlength"))) {
      if ($(this).val().length > $(this).attr("maxlength")) {
        validate += 1;
        $(this)
          .closest("dd")
          .addClass("error max");
      }
    }

    if ($(this).attr("type") == "email") {
      if (
        !$(this)
          .val()
          .match(/^[A-Za-z0-9]+[\w\.-]+@[A-Za-z0-9]+[\w\.-]+\.\w{2,}$/)
      ) {
        validate += 1;
        $(this)
          .closest("dd")
          .addClass("error email");
      }
    }
  });

  if (validate > 0) {
    return false;
  } else {
    let text = "この内容で送信してよろしいですか？";
    text += "\n\nお名前\n";
    text += $("#contact-name").val();
    text += "\n\nメールアドレス\n";
    text += $("#contact-email").val();
    text += "\n\nお問い合わせ内容\n";
    text += $("#contact-content").val();

    let check = window.confirm(text);
    if (check) {
      self.sendContact();
    } else {
      return false;
    }
  }
};

Form.prototype.sendContact = function() {
  var self = this;
  // フォームデータ作成
  let data = new FormData();
  // data.append(name属性, 値);
  data.append("name", $("#contact-name").val());
  data.append("email", $("#contact-email").val());
  data.append("content", $("#contact-content").val());
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
      $("#form-contact button.confirm").remove();
      $("#form-contact").addClass("success");
    })
    .fail(function(data) {
      $("#form-contact").addClass("faild");
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

//お問い合わせフォーム
var form = new Form();
