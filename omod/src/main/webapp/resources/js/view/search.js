/*
 * The contents of this file are subject to the OpenMRS Public License
 * Version 2.0 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://license.openmrs.org
 *
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 *
 * Copyright (C) OpenMRS, LLC.  All Rights Reserved.
 */
define(
	[
		openhmis.url.backboneBase + 'js/lib/jquery',
		openhmis.url.backboneBase + 'js/lib/underscore',
		openhmis.url.backboneBase + 'js/lib/backbone',
		openhmis.url.backboneBase + 'js/lib/i18n',
		openhmis.url.backboneBase + 'js/view/search'
	],
	function($, _, Backbone, __, openhmis) {
		openhmis.DepartmentAndNameSearchView = openhmis.BaseSearchView.extend(
		/** @lends DepartmentAndNameSearchView.prototype */
		{
			tmplFile: openhmis.url.inventoryBase + 'template/search.html',
			tmplSelector: '#department-name-search',

			/**
			 * @class DepartmentAndNameSearchView
			 * @extends BaseSearchView
			 * @classdesc A search view that supports searching by department
			 *     and name.
			 * @constructor DepartmentAndNameSearchView
			 * @param {map} options View options.  See options for
			 *     {@link BaseSearchView}.
			 *
			 */
			initialize: function(options) {
				this.events['change #department_uuid'] = 'onFormSubmit';
				this.events['change #category_uuid'] = 'onFormSubmit';
				openhmis.BaseSearchView.prototype.initialize.call(this, options);
				var departmentCollection = new openhmis.GenericCollection([], { model: openhmis.Department });
				var categoryCollection = new openhmis.GenericCollection([], { model: openhmis.Category });
				departmentCollection.on("reset", function(collection) {
					collection.unshift(new openhmis.Department({ name: __("Any") }));
				});
				categoryCollection.on("reset", function(collection) {
					collection.unshift(new openhmis.Category({ name: __("Any") }));
				});
				this.form = new Backbone.Form({
					className: "inline",
					schema: {
						department_uuid: {
							title: __("Department"),
							type: "Select",
							options: departmentCollection
						},
						category_uuid: {
							title: __("Category"),
							type: "Select",
							options: categoryCollection
						},
						q: {
							title: __("%s Identifier or Name", this.model.meta.name),
							type: "Text",
							editorClass: "search"
						}
					},
					data: {}
				});
			},

			/** Collect user input */
			commitForm: function() {
				var filters = this.form.getValue();
				if (!filters.department_uuid && !filters.category_uuid && !filters.q)
					this.searchFilter = undefined;
				else
					this.searchFilter = filters;
			},

			/**
			 * Get fetch options
			 *
			 * @param {map} options Fetch options from base view
			 * @returns {map} Map of fetch options
			 */
			getFetchOptions: function(options) {
				options = options ? options : {}
				if (this.searchFilter) {
					for (var filter in this.searchFilter)
						options.queryString = openhmis.addQueryStringParameter(
							options.queryString, filter + "=" + encodeURIComponent(this.searchFilter[filter]));
				}
				return options;
			},

			/** Focus the search form */
			focus: function() { this.$("#q").focus(); },

			/**
			 * Render the view
			 *
			 * @returns {View} The rendered view
			 */
			render: function() {
				this.$el.html(this.template({ __: __ }));
				this.$("div.box").append(this.form.render().el);
				if (this.searchFilter)
					this.form.setValue(this.searchFilter);
				this.$("form").addClass("inline");
				this.$("form ul").append('<button id="submit">'+__("Search")+'</button>');
				return this;
			}
		});

		openhmis.LocationAndNameSearchView = openhmis.BaseSearchView.extend({
			tmplFile: openhmis.url.inventoryBase + 'template/search.html',
			tmplSelector: '#location-name-search',

			initialize: function(options) {
				this.events['change #location_uuid'] = 'onFormSubmit';
				openhmis.BaseSearchView.prototype.initialize.call(this, options);
				var locationCollection = new openhmis.GenericCollection([], { model: openhmis.Location });
				locationCollection.on("reset", function(collection) {
					collection.unshift(new openhmis.Location({ name: __("Any") }));
				});
				this.form = new Backbone.Form({
					className: "inline",
					schema: {
						location_uuid: {
							title: __("Location"),
							type: "Select",
							options: locationCollection
						},
						q: {
							title: __("%s Name", this.model.meta.name),
							type: "Text",
							editorClass: "search"
						}
					},
					data: {}
				});
			},

			/** Collect user input */
			commitForm: function() {
				var filters = this.form.getValue();
				if (!filters.location_uuid && !filters.q)
					this.searchFilter = undefined;
				else
					this.searchFilter = filters;
			},

			/**
			 * Get fetch options
			 *
			 * @param {map} options Fetch options from base view
			 * @returns {map} Map of fetch options
			 */
			getFetchOptions: function(options) {
				options = options ? options : {}
				if (this.searchFilter) {
					for (var filter in this.searchFilter)
						options.queryString = openhmis.addQueryStringParameter(
							options.queryString, filter + "=" + encodeURIComponent(this.searchFilter[filter]));
				}
				return options;
			},

			/** Focus the search form */
			focus: function() { this.$("#q").focus(); },

			/**
			 * Render the view
			 *
			 * @returns {View} The rendered view
			 */
			render: function() {
				this.$el.html(this.template({ __: __ }));
				this.$("div.box").append(this.form.render().el);
				if (this.searchFilter)
					this.form.setValue(this.searchFilter);
				this.$("form").addClass("inline");
				this.$("form ul").append('<button id="submit">'+__("Search")+'</button>');
				return this;
			}
		});

		openhmis.ByNameSearchView = openhmis.BaseSearchView.extend({
			tmplFile: openhmis.url.inventoryBase + 'template/search.html',
			tmplSelector: '#by-name-search',

			initialize: function(options) {
				openhmis.BaseSearchView.prototype.initialize.call(this, options);
				this.form = new Backbone.Form({
					className: "inline",
					schema: {
						q: {
							title: __("%s Name", this.model.meta.name),
							type: "Text",
							editorClass: "search"
						}
					},
					data: {}
				});
			},

			getFetchOptions: function(options) {
				options = options ? options : {}
				if (this.searchFilter) {
					for (var filter in this.searchFilter)
						options.queryString = openhmis.addQueryStringParameter(
							options.queryString, filter + "=" + encodeURIComponent(this.searchFilter[filter]));
				}
				return options;
			},

			focus: function() { this.$("#q").focus(); },

			commitForm: function() {
				var filters = this.form.getValue();
				this.searchFilter = filters;
			},

			render: function() {
				this.$el.html(this.template({ __: __ }));
				this.$("div.box").append(this.form.render().el);
				if (this.searchFilter)
					this.form.setValue(this.searchFilter);
				this.$("form").addClass("inline");
				this.$("form ul").append('<button id="submit">'+__("Search")+'</button>');
				return this;
			}
		});

		return openhmis;
	}
)