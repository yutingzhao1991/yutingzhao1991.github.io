'use strict';

$(function() {
    var TEMPLATE = '<div class="item">\
      <h3><%= name %></h3>\
      <% if (link) { %>\
        <a href="<%= link %>">\
      <% } %>\
      <% if (image) { %>\
        <img class="image" src="<%= image %>">\
      <% } else { %>\
        <div class="image"><%= name %></div>\
      <% } %>\
      <% if (link) { %>\
        </a>\
      <% } %>\
      <div class="description"><%= description %></div>\
    </div>'
    var compiled = _.template(TEMPLATE)
    $.get('config.json').then(function(data) {
        var htmls = {
            game: '',
            visualization: '',
            others: ''
        }
        data.list.forEach(function(item) {
            console.log(item)
            if (htmls[item.type] == null) {
                return
            }
            htmls[item.type] += compiled(item)
        })
        console.log(htmls)
        for (var type in htmls) {
            $('#' + type).html(htmls[type])
        }
    })
})