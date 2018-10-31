var ready = false;

var pending = [];

var captchaKey = sera.captchaKey;

var render = function (el, options, done) {
    var id = grecaptcha.render(el, {
        sitekey: captchaKey,
        callback: options.success,
        'expired-callback': options.expired,
        'error-callback': options.error
    });
    done(null, id);
};

window.serand_captcha_ready = function () {
    ready = true;
    pending.forEach(function (ctx) {
        render(ctx.el[0], ctx.options, ctx.done);
    });
};

module.exports.render = function (el, options, done) {
    options = options || {};
    if (!ready) {
        return pending.push({el: el, options: options, done: done});
    }
    render(el[0], options, done);
};

module.exports.response = function (id, done) {
    done(null, grecaptcha.getResponse(id));
};
