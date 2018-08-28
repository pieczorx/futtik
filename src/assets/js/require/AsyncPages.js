/*
Writen by Jakub Pieczora
https://github.com/pieczorx
*/

class AsyncPages {
  constructor(options) {
    if(!options){
      options = {};
    }
    this.options = options;
    this.routes = [];
    var that = this;
    $(document).on("click", "a", function(e) {
      if($(this).attr('target') != '_blank' && $(this).attr('data-a-reload-page') != 1) {
        e.preventDefault();
        that.go($(this).attr("href"));
      }
    }) //Href click
    window.addEventListener('popstate', function(e) {that.go(window.location.pathname, {popstate: true}); e.preventDefault();}, false); //Previous page or next page
  }
  go(url, options) {
    if(!options) {
      options = {};
    }
    const url_new_args = this.url_to_args(url);
    this.handle_routes(url_new_args, options);
  }
  getCurrentLocale() {
    const args = this.url_to_args(window.location.href);
    if(this.options.supported_locales && this.options.supported_locales.includes(args[0])) {
      return args[0];
    }
    return false;
  }
  getCurrentLocaleString() {
    const currentLocale = a.getCurrentLocale();
    return currentLocale ? `/${currentLocale}` : '';
  }
  handle_routes(args, options) {
    let that = this;
    var matching_routes = [];
    for(var i = 0; i < this.routes.length; i++) {
      if(this.match_route_with_arg(this.routes[i].args, args, this.routes[i].use)) {
        matching_routes[matching_routes.length] = this.routes[i];
      }
    }
    const args_no_locale = this.remove_locale_from_args(args);
    var url = '/' + args.join('/');
    var r_object = {
      args: args_no_locale,
      args_previous: this.remove_locale_from_args(this.url_to_args(window.location.href)),
      args_original: args,
      set_url: function() {
        window.history.pushState({path: url}, '', url);
      },
      set_data_args: function() {
        that.set_data_args(args_no_locale);
      },
      popstate: options.popstate
    };
    var current_route_id = -1;
    var next = null;
    next = function() {
      current_route_id++;
      if(typeof(matching_routes[current_route_id]) != 'undefined') {
        matching_routes[current_route_id].f(r_object, next);
      } else {
        if(options.callback) {
          options.callback();
        }
      }

    };
    next();

  }
  set_data_args(args) {
    $("[data-a-args]").each(function() {
      let div_args = $(this).attr('data-a-args').split(',');
      let matches = true;
      for(let i = 0; i < div_args.length; i++) {
        let div_arg = div_args[i];
        let arg = args[i];
        if(div_arg != arg) {
          matches = false;
        }
      }
      $(this).attr('data-a-current', matches << 0);
    });
  }
  url_to_args(url) {
    var path = null;
    if(url.charAt(0) == '/') {
      path = url;
    } else {
      path = new URL(url).pathname;
    }

    if(path.slice(-1) != '/') {
      path = path + '/';
    }

    var args = path.split('/');
    if(path.charAt(0) == '/') {
      args.shift();
    }
    return args;
  }
  use(url, f) {
    if(!f) {
      f = url;
      url = false;
    }
    this.routes[this.routes.length] = {
      args: url ? this.url_to_args(url) : [],
      f: f,
      use: true
    }
  }
  get(url, f) {
    if(!f) {
      f = url;
      url = false;
    }
    this.routes[this.routes.length] = {
      args: url ? this.url_to_args(url) : [],
      f: f,
      use: false
    }
  }
  remove_locale_from_args(args) {
    let args_new = [];
    Object.assign(args_new, args);
    if(this.options.supported_locales && this.options.supported_locales.includes(args_new[0])) {
      args_new.shift();
    }
    return args_new;
  }
  match_route_with_arg(route, args, use) {
    //Remove first argument if matches one of supported locales
    let arg = [];
    Object.assign(arg, args);
    arg = this.remove_locale_from_args(arg);

    var matches = true;
    var final_route_length = route.length - 1;
    if(!use) {
      final_route_length++;
    }
    for(var i = 0; i < final_route_length; i++) {
      if(route[i] == arg[i] || (route[i] == '*' && arg[i] != '')) {

      } else {
        matches = false;
      }
    }

    return matches;
  }
  reload() {
    this.go(window.location.pathname);
  }
}
