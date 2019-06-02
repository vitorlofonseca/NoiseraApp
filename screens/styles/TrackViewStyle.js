'use strict'

var React = require('react-native')

var styles = React.StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    div_row_header: {
        flexDirection: 'row',
        margin: 12,
    },
    div_row_body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 12,
    },
    div_row_body__without_row: {
        margin: 12,
    },
    box: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        marginTop: 5,
    },
    info_title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    track_info__div: {
        marginLeft: 12,
    },
    track_info__text: {
        fontSize: 14,
        marginBottom: 5,
    },
    track_title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})

module.exports = styles
