// Class for visualizing "Top items" as a histogram
function TopHistogram (params) {
  var self = this

  // Immutable
  self._translations = params.translations
  self._props = {
    id: params.id,
    margin: params.margin,
  }
  self._elem = {}
  self._helpers = {}
  self._schema = params.schema

  // Mutable
  self._state = {
    locale: undefined,
    contentArea: {},
    dataArea: {},
    isDataInited: false,
  }

  self._data = {}

  self._renderBase(params.element)
  self.resize(params.width, params.height)
  self._renderAxisX()
  self._renderAxisY()
  self.setLocale(params.locale)
}


// Whenever new data arrives
TopHistogram.prototype.setData = function (data) {
  var self = this
  console.log('TopHistogram.setData', data)
  self._data = self._transformData(data)
  self._state.isDataInited = true

  // Update x and y domain ranges based on histgram bar data
  self._helpers.xScale.domain(
    d3.map(self._data.histogram, function(d) { return d[self._schema.labelField] }).keys()
  )

  self._helpers.yScale.domain([0, d3.max(self._data.histogram, function(d) { return d[self._schema.valueField] })])

  self._renderHistogram(self._data.histogram)
}


// Change language and units according to given locale
TopHistogram.prototype.setLocale = function (locale) {
  var self = this
  self._state.locale = locale
  self._elem.title.text(self._translations.title[self._state.locale])
}


// Resize the visualization to a new pixel size on the screen
TopHistogram.prototype.resize = function (contentWidth, contentHeight = undefined) {
  var self = this
  self._state.contentArea.width = contentWidth
  self._elem.svg.attr('width', self._state.contentArea.width)
  if (typeof contentHeight !== 'undefined') {
    self._state.contentArea.height = contentHeight
    self._elem.svg.attr('height', self._state.contentArea.height)
  }
  self._state.dataArea = {
    width: self._state.contentArea.width - self._props.margin.left - self._props.margin.right,
    height: self._state.contentArea.height - self._props.margin.top - self._props.margin.bottom,
  }

  self._elem.svgCanvas
    .attr('transform', 'translate(' + self._props.margin.left + ',' + self._props.margin.top + ')')

  // Update pixel ranges for x and y dimension
  self._helpers.xScale.rangeRound([0, self._state.dataArea.width])
  self._helpers.yScale.rangeRound([self._state.dataArea.height, 0])
}


// Turn data input format into the internal format used in visualizing the data
TopHistogram.prototype._transformData = function (data) {
  var self = this

  // Sort
  var result = data.slice()
  result = result.sort(function(a, b) {
    return parseFloat(a[self._schema.valueFied]) - parseFloat(b[self._schema.valueFied])
  })

  console.log('*** result', result)

  return {
    histogram: result
  }
}


// Render things that don't change when receiving the first data, updating the data, changing the locale or resizing the content area
TopHistogram.prototype._renderBase = function (container) {
  var self = this

  self._elem.container = container
  self._elem.container.classed('statistics-vis top-histogram', true)

  self._elem.title = self._elem.container.append('h3')
    .classed('statistics-vis-title', true)

  self._elem.svg = self._elem.container.append('svg')
  self._elem.svgCanvas = self._elem.svg.append('g')

  self._elem.backLayer = self._elem.svgCanvas.append('g')

  self._elem.dataCanvas = self._elem.svgCanvas.append('g')
  self._elem.histogramCanvas = self._elem.dataCanvas.append('g')

  self._elem.frontLayer = self._elem.svgCanvas.append('g')

  self._helpers.xScale = d3.scaleBand().padding(0.1)
  self._helpers.yScale = d3.scaleLinear()
}


// Draw X axis
TopHistogram.prototype._renderAxisX = function () {
  var self = this
  self._elem.xAxis = self._elem.frontLayer.append('g')
    // .classed('statistics-axis statistics-axis-x', true)
    .attr('transform', 'translate(0,' + self._state.dataArea.height + ')')
    .call(d3.axisBottom(self._helpers.xScale))
}


// Draw Y axis
TopHistogram.prototype._renderAxisY = function () {
  var self = this
  self._elem.yAxis = self._elem.frontLayer.append('g')
      // .classed('statistics-axis statistics-axis-y', true)
      .call(d3.axisLeft(self._helpers.yScale).ticks(10, '%'))

  self._elem.yAxis
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.75em')
      .attr('text-anchor', 'end')
      .text('Kpl')
}


// Draw or update the histogram bars with the given data
TopHistogram.prototype._renderHistogram = function (histogramData) {
  var self = this

  // Join new data
  self._elem.histogramBars = self._elem.histogramCanvas.selectAll('.bar')
      .data(histogramData)

  // Updated, remaining bars: Nothing to do
  // self._elem.histogramBars
  //   . ...

  // Sort
  self._elem.histogramBars.sort(function (a, b) {
    return a[self._schema.valueField] < b[self._schema.valueField]
  })

  // Bars added to the previous data (added to the end)
  var barsToAdd = self._elem.histogramBars.enter().append('g')
    .classed('bar', true)
    .attr('transform', function(d, i) { return (
      'translate(' + self._helpers.xScale(d[self._schema.labelField]) + ',' + self._helpers.yScale(d[self._schema.valueField]) + ')'
    )})

  // Bar itself
  barsToAdd.append('rect')
    .attr('x', 1)
    .attr('width', self._helpers.xScale.bandwidth())
    .attr('height', function (d) { return (
      self._state.dataArea.height - self._helpers.yScale(d[self._schema.valueField])
    )})

  // Value text
  barsToAdd.append('text')
    .attr('dy', '.75em')
    .attr('y', -12)
    .attr('x', self._helpers.xScale.bandwidth() / 2)
    .attr('text-anchor', 'middle')
    .text(function (d) { return d[self._schema.valueField] })

  // Label text
  barsToAdd.append('text')
    .attr('dy', '.75em')
    .attr('y', function(d) { return (
       self._state.dataArea.height
       - self._helpers.yScale(d[self._schema.valueField])
       + 6
    )})
    .attr('x', self._helpers.xScale.bandwidth() / 2)
    .attr('text-anchor', 'middle')
    .text(function(d) { return d[self._schema.labelField] })

  // Bars from previous data to leave out
  var barsToRemove = self._elem.histogramBars.exit()
  barsToRemove.remove()
}