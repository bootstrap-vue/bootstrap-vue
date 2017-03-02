<template>
    <layout :docs="docs">
        <template slot="name">
            Dropdowns
        </template>

        <template slot="description">
            Dropdowns are toggleable, contextual overlays for displaying lists of links and more.
            They’re made interactive with the included Bootstrap dropdown JavaScript plugin.
            They’re toggled by clicking, not by hovering; this is an
            <a href="http://markdotto.com/2012/02/27/bootstrap-explained-dropdowns/">intentional design decision.</a>.
        </template>

        <template slot="demo">

            <b-dropdown text="Dropdown Button sm" size="sm" class="m-md-2">
                <a class="dropdown-item">Action</a>
                <a class="dropdown-item">Another action</a>
                <a class="dropdown-item">Something else here</a>
            </b-dropdown>

            <b-dropdown text="Split Dropdown Button" variant="success" split @click="click" class="m-md-2">
                <a class="dropdown-item">Action</a>
                <a class="dropdown-item">Another action</a>
                <a class="dropdown-item">Something else here...</a>
            </b-dropdown>

            <b-dropdown text="Drop-Up" dropup variant="info" class="m-md-2">
                <a class="dropdown-item">Action</a>
                <a class="dropdown-item">Another action</a>
                <a class="dropdown-item">Something else here</a>
            </b-dropdown>

            <b-dropdown text="Right align" variant="warning" right class="m-md-2">
                <a class="dropdown-item">Action</a>
                <a class="dropdown-item">Another action</a>
                <a class="dropdown-item">Something else here</a>
            </b-dropdown>

            <br>
            <b-dropdown text="Right align" variant="warning" right class="m-md-2">
                <span slot="text">
                    <div class="ir"></div>
                    Custom Button content
                </span>
                <a class="dropdown-item">Action</a>
                <a class="dropdown-item">Another action</a>
                <a class="dropdown-item">Something else here</a>
            </b-dropdown>

        </template>

        <template slot="usage">
            &lt;b-dropdown text=&quot;Split Dropdown Button&quot; variant=&quot;success&quot; split @click=&quot;click&quot;&gt;
            &emsp; &lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Action&lt;/a&gt;
            &emsp; &lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Another action&lt;/a&gt;
            &emsp; &lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Something else here&lt;/a&gt;
            &lt;/b-dropdown&gt;
        </template>

    </layout>
</template>

<style>
    .ir {
        /* Copyright http://www.phoca.cz/cssflags */
        display: inline-block;
        vertical-align: middle;
        background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNTQwIDg4MCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KPGRlZnM+DQo8cGF0aCBmaWxsPSIjZmZmIiBpZD0iQWxsYWh1X0FrYmFyIiBkPSJtMCwwIDEsMCAwLTIgMywwIDAsMiA1LDAgMC0zLTMsMCAwLDEgMiwwIDAsMS0zLDAgMC0yLTUsMCAwLDN6bTIsMCAxLDAgMC0xLTEsMCAwLDF6bS0yLTQgMTMsMCAwLTEtMTMsMCAwLDF6bTEzLDQtMywwIDAtMyA0LDAgMC0yIDEsMCAwLDQgMSwwIDAtNCAxLDAgMCw0IDEsMCAwLTQgMSwwIDAsNS01LDAgMC0yLTMsMCAwLDEgMiwwIDAsMXoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05LjUpIi8+DQo8cGF0aCBmaWxsPSIjZmZmIiBpZD0ibGluZXMiIGQ9Im0wLDAgOSwwIDAtMi05LDAgMCwyem0xMCwwIDksMCAwLTItOSwwIDAsMnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05LjUpIi8+DQo8L2RlZnM+DQo8cGF0aCBmaWxsPSIjZmZmIiBkPSJtMCwwIDE1NDAsMCAwLDg4MGgtMTU0MHYtODgweiIvPg0KPHBhdGggZmlsbD0iIzIzOWY0MCIgZD0ibTAsMGgxNTQwdjI5NGgtMTU0MHoiLz4NCjxwYXRoIGZpbGw9IiNkYTAwMDAiIGQ9Im03NDMsMzI5Yy0yLDcgMSwxNCA3LDE4IDcsNCAxNSwyIDIwLTMgNSw1IDEzLDcgMjAsMyA2LTQgOS0xMSA3LTE4LTIsNC03LDctMTIsOC01LDEtMTEsMC0xNS0zLTQsMy0xMCw0LTE1LDMtNS0xLTEwLTQtMTItOHptMjcsMTktMTQsMTEgMiwxNDljLTExLTktMjEtMjAtMjktMzMtMjItMzgtMTktODYgNy0xMjEtNDAsMzEtNTEsODgtMjUsMTMyIDEwLDE3IDI0LDMwIDQwLDM4LTE2LDYtMzIsOC00OSw2IDE4LDcgMzgsOSA1Nyw1djFsMTEsMTMgMTEtMTN2LTFjMTksNCAzOSwyIDU3LTUtMTcsMi0zMywwLTQ5LTYgMTYtOCAzMC0yMSA0MC0zOCAyNi00NCAxNS0xMDEtMjUtMTMyIDI2LDM1IDI5LDgzIDcsMTIxLTgsMTMtMTgsMjQtMjksMzNsMi0xNDktMTQtMTF6bS00NywyYy0zNSwxMC02MCwzOS02NCw3NS01LDM2IDE0LDcwIDQ1LDg4LTIwLTI0LTMwLTU1LTI2LTg2IDQtMzEgMjAtNTkgNDUtNzd6bTk0LDBjMjUsMTggNDEsNDYgNDUsNzcgNCwzMS02LDYyLTI2LDg2IDMxLTE4IDUwLTUyIDQ1LTg4LTQtMzYtMjktNjUtNjQtNzV6bS04MTcsMjM2djI5NGgxNTQwdi0yOTRoLTE1NDB6Ii8+DQo8dXNlIHdpZHRoPSIxNTQwIiBoZWlnaHQ9Ijg4MCIgeGxpbms6aHJlZj0iI0FsbGFodV9Ba2JhciIgdHJhbnNmb3JtPSJtYXRyaXgoNyAwIDAgNyA3MCAyODApIi8+DQo8dXNlIHdpZHRoPSIxNTQwIiBoZWlnaHQ9Ijg4MCIgeGxpbms6aHJlZj0iI0FsbGFodV9Ba2JhciIgdHJhbnNmb3JtPSJtYXRyaXgoNyAwIDAgNyAyMTAgMjgwKSIvPg0KPHVzZSB3aWR0aD0iMTU0MCIgaGVpZ2h0PSI4ODAiIHhsaW5rOmhyZWY9IiNBbGxhaHVfQWtiYXIiIHRyYW5zZm9ybT0ibWF0cml4KDcgMCAwIDcgMzUwIDI4MCkiLz4NCjx1c2Ugd2lkdGg9IjE1NDAiIGhlaWdodD0iODgwIiB4bGluazpocmVmPSIjQWxsYWh1X0FrYmFyIiB0cmFuc2Zvcm09Im1hdHJpeCg3IDAgMCA3IDQ5MCAyODApIi8+DQo8dXNlIHdpZHRoPSIxNTQwIiBoZWlnaHQ9Ijg4MCIgeGxpbms6aHJlZj0iI0FsbGFodV9Ba2JhciIgdHJhbnNmb3JtPSJtYXRyaXgoNyAwIDAgNyA2MzAgMjgwKSIvPg0KPHVzZSB3aWR0aD0iMTU0MCIgaGVpZ2h0PSI4ODAiIHhsaW5rOmhyZWY9IiNBbGxhaHVfQWtiYXIiIHRyYW5zZm9ybT0ibWF0cml4KDcgMCAwIDcgNzcwIDI4MCkiLz4NCjx1c2Ugd2lkdGg9IjE1NDAiIGhlaWdodD0iODgwIiB4bGluazpocmVmPSIjQWxsYWh1X0FrYmFyIiB0cmFuc2Zvcm09Im1hdHJpeCg3IDAgMCA3IDkxMCAyODApIi8+DQo8dXNlIHdpZHRoPSIxNTQwIiBoZWlnaHQ9Ijg4MCIgeGxpbms6aHJlZj0iI0FsbGFodV9Ba2JhciIgdHJhbnNmb3JtPSJtYXRyaXgoNyAwIDAgNyAxMDUwIDI4MCkiLz4NCjx1c2Ugd2lkdGg9IjE1NDAiIGhlaWdodD0iODgwIiB4bGluazpocmVmPSIjQWxsYWh1X0FrYmFyIiB0cmFuc2Zvcm09Im1hdHJpeCg3IDAgMCA3IDExOTAgMjgwKSIvPg0KPHVzZSB3aWR0aD0iMTU0MCIgaGVpZ2h0PSI4ODAiIHhsaW5rOmhyZWY9IiNBbGxhaHVfQWtiYXIiIHRyYW5zZm9ybT0ibWF0cml4KDcgMCAwIDcgMTMzMCAyODApIi8+DQo8dXNlIHdpZHRoPSIxNTQwIiBoZWlnaHQ9Ijg4MCIgeGxpbms6aHJlZj0iI0FsbGFodV9Ba2JhciIgdHJhbnNmb3JtPSJtYXRyaXgoNyAwIDAgNyAxNDcwIDI4MCkiLz4NCjx1c2Ugd2lkdGg9IjE1NDAiIGhlaWdodD0iODgwIiB4bGluazpocmVmPSIjbGluZXMiIHRyYW5zZm9ybT0ibWF0cml4KDcgMCAwIDcgNzAgMzAxKSIvPg0KPHVzZSB3aWR0aD0iMTU0MCIgaGVpZ2h0PSI4ODAiIHhsaW5rOmhyZWY9IiNsaW5lcyIgdHJhbnNmb3JtPSJtYXRyaXgoNyAwIDAgNyAyMTAgMzAxKSIvPg0KPHVzZSB3aWR0aD0iMTU0MCIgaGVpZ2h0PSI4ODAiIHhsaW5rOmhyZWY9IiNsaW5lcyIgdHJhbnNmb3JtPSJtYXRyaXgoNyAwIDAgNyAzNTAgMzAxKSIvPg0KPHVzZSB3aWR0aD0iMTU0MCIgaGVpZ2h0PSI4ODAiIHhsaW5rOmhyZWY9IiNsaW5lcyIgdHJhbnNmb3JtPSJtYXRyaXgoNyAwIDAgNyA0OTAgMzAxKSIvPg0KPHVzZSB3aWR0aD0iMTU0MCIgaGVpZ2h0PSI4ODAiIHhsaW5rOmhyZWY9IiNsaW5lcyIgdHJhbnNmb3JtPSJtYXRyaXgoNyAwIDAgNyA2MzAgMzAxKSIvPg0KPHVzZSB3aWR0aD0iMTU0MCIgaGVpZ2h0PSI4ODAiIHhsaW5rOmhyZWY9IiNsaW5lcyIgdHJhbnNmb3JtPSJtYXRyaXgoNyAwIDAgNyA3NzAgMzAxKSIvPg0KPHVzZSB3aWR0aD0iMTU0MCIgaGVpZ2h0PSI4ODAiIHhsaW5rOmhyZWY9IiNsaW5lcyIgdHJhbnNmb3JtPSJtYXRyaXgoNyAwIDAgNyA5MTAgMzAxKSIvPg0KPHVzZSB3aWR0aD0iMTU0MCIgaGVpZ2h0PSI4ODAiIHhsaW5rOmhyZWY9IiNsaW5lcyIgdHJhbnNmb3JtPSJtYXRyaXgoNyAwIDAgNyAxMDUwIDMwMSkiLz4NCjx1c2Ugd2lkdGg9IjE1NDAiIGhlaWdodD0iODgwIiB4bGluazpocmVmPSIjbGluZXMiIHRyYW5zZm9ybT0ibWF0cml4KDcgMCAwIDcgMTE5MCAzMDEpIi8+DQo8dXNlIHdpZHRoPSIxNTQwIiBoZWlnaHQ9Ijg4MCIgeGxpbms6aHJlZj0iI2xpbmVzIiB0cmFuc2Zvcm09Im1hdHJpeCg3IDAgMCA3IDEzMzAgMzAxKSIvPg0KPHVzZSB3aWR0aD0iMTU0MCIgaGVpZ2h0PSI4ODAiIHhsaW5rOmhyZWY9IiNsaW5lcyIgdHJhbnNmb3JtPSJtYXRyaXgoNyAwIDAgNyAxNDcwIDMwMSkiLz4NCjx1c2Ugd2lkdGg9IjE1NDAiIGhlaWdodD0iODgwIiB4bGluazpocmVmPSIjQWxsYWh1X0FrYmFyIiB0cmFuc2Zvcm09Im1hdHJpeCg3IDAgMCA3IDcwIDYzNSkiLz4NCjx1c2Ugd2lkdGg9IjE1NDAiIGhlaWdodD0iODgwIiB4bGluazpocmVmPSIjQWxsYWh1X0FrYmFyIiB0cmFuc2Zvcm09Im1hdHJpeCg3IDAgMCA3IDIxMCA2MzUpIi8+DQo8dXNlIHdpZHRoPSIxNTQwIiBoZWlnaHQ9Ijg4MCIgeGxpbms6aHJlZj0iI0FsbGFodV9Ba2JhciIgdHJhbnNmb3JtPSJtYXRyaXgoNyAwIDAgNyAzNTAgNjM1KSIvPg0KPHVzZSB3aWR0aD0iMTU0MCIgaGVpZ2h0PSI4ODAiIHhsaW5rOmhyZWY9IiNBbGxhaHVfQWtiYXIiIHRyYW5zZm9ybT0ibWF0cml4KDcgMCAwIDcgNDkwIDYzNSkiLz4NCjx1c2Ugd2lkdGg9IjE1NDAiIGhlaWdodD0iODgwIiB4bGluazpocmVmPSIjQWxsYWh1X0FrYmFyIiB0cmFuc2Zvcm09Im1hdHJpeCg3IDAgMCA3IDYzMCA2MzUpIi8+DQo8dXNlIHdpZHRoPSIxNTQwIiBoZWlnaHQ9Ijg4MCIgeGxpbms6aHJlZj0iI0FsbGFodV9Ba2JhciIgdHJhbnNmb3JtPSJtYXRyaXgoNyAwIDAgNyA3NzAgNjM1KSIvPg0KPHVzZSB3aWR0aD0iMTU0MCIgaGVpZ2h0PSI4ODAiIHhsaW5rOmhyZWY9IiNBbGxhaHVfQWtiYXIiIHRyYW5zZm9ybT0ibWF0cml4KDcgMCAwIDcgOTEwIDYzNSkiLz4NCjx1c2Ugd2lkdGg9IjE1NDAiIGhlaWdodD0iODgwIiB4bGluazpocmVmPSIjQWxsYWh1X0FrYmFyIiB0cmFuc2Zvcm09Im1hdHJpeCg3IDAgMCA3IDEwNTAgNjM1KSIvPg0KPHVzZSB3aWR0aD0iMTU0MCIgaGVpZ2h0PSI4ODAiIHhsaW5rOmhyZWY9IiNBbGxhaHVfQWtiYXIiIHRyYW5zZm9ybT0ibWF0cml4KDcgMCAwIDcgMTE5MCA2MzUpIi8+DQo8dXNlIHdpZHRoPSIxNTQwIiBoZWlnaHQ9Ijg4MCIgeGxpbms6aHJlZj0iI0FsbGFodV9Ba2JhciIgdHJhbnNmb3JtPSJtYXRyaXgoNyAwIDAgNyAxMzMwIDYzNSkiLz4NCjx1c2Ugd2lkdGg9IjE1NDAiIGhlaWdodD0iODgwIiB4bGluazpocmVmPSIjQWxsYWh1X0FrYmFyIiB0cmFuc2Zvcm09Im1hdHJpeCg3IDAgMCA3IDE0NzAgNjM1KSIvPg0KPHVzZSB3aWR0aD0iMTU0MCIgaGVpZ2h0PSI4ODAiIHhsaW5rOmhyZWY9IiNsaW5lcyIgdHJhbnNmb3JtPSJtYXRyaXgoNyAwIDAgNyA3MCA1OTMpIi8+DQo8dXNlIHdpZHRoPSIxNTQwIiBoZWlnaHQ9Ijg4MCIgeGxpbms6aHJlZj0iI2xpbmVzIiB0cmFuc2Zvcm09Im1hdHJpeCg3IDAgMCA3IDIxMCA1OTMpIi8+DQo8dXNlIHdpZHRoPSIxNTQwIiBoZWlnaHQ9Ijg4MCIgeGxpbms6aHJlZj0iI2xpbmVzIiB0cmFuc2Zvcm09Im1hdHJpeCg3IDAgMCA3IDM1MCA1OTMpIi8+DQo8dXNlIHdpZHRoPSIxNTQwIiBoZWlnaHQ9Ijg4MCIgeGxpbms6aHJlZj0iI2xpbmVzIiB0cmFuc2Zvcm09Im1hdHJpeCg3IDAgMCA3IDQ5MCA1OTMpIi8+DQo8dXNlIHdpZHRoPSIxNTQwIiBoZWlnaHQ9Ijg4MCIgeGxpbms6aHJlZj0iI2xpbmVzIiB0cmFuc2Zvcm09Im1hdHJpeCg3IDAgMCA3IDYzMCA1OTMpIi8+DQo8dXNlIHdpZHRoPSIxNTQwIiBoZWlnaHQ9Ijg4MCIgeGxpbms6aHJlZj0iI2xpbmVzIiB0cmFuc2Zvcm09Im1hdHJpeCg3IDAgMCA3IDc3MCA1OTMpIi8+DQo8dXNlIHdpZHRoPSIxNTQwIiBoZWlnaHQ9Ijg4MCIgeGxpbms6aHJlZj0iI2xpbmVzIiB0cmFuc2Zvcm09Im1hdHJpeCg3IDAgMCA3IDkxMCA1OTMpIi8+DQo8dXNlIHdpZHRoPSIxNTQwIiBoZWlnaHQ9Ijg4MCIgeGxpbms6aHJlZj0iI2xpbmVzIiB0cmFuc2Zvcm09Im1hdHJpeCg3IDAgMCA3IDEwNTAgNTkzKSIvPg0KPHVzZSB3aWR0aD0iMTU0MCIgaGVpZ2h0PSI4ODAiIHhsaW5rOmhyZWY9IiNsaW5lcyIgdHJhbnNmb3JtPSJtYXRyaXgoNyAwIDAgNyAxMTkwIDU5MykiLz4NCjx1c2Ugd2lkdGg9IjE1NDAiIGhlaWdodD0iODgwIiB4bGluazpocmVmPSIjbGluZXMiIHRyYW5zZm9ybT0ibWF0cml4KDcgMCAwIDcgMTMzMCA1OTMpIi8+DQo8dXNlIHdpZHRoPSIxNTQwIiBoZWlnaHQ9Ijg4MCIgeGxpbms6aHJlZj0iI2xpbmVzIiB0cmFuc2Zvcm09Im1hdHJpeCg3IDAgMCA3IDE0NzAgNTkzKSIvPg0KPC9zdmc+DQo=');
        width: 20px;
        height: 20px;
        background-size: 100% 100%;
    }
</style>

<script>
    import layout from '../../../layouts/components.vue';

    export default {
        components: {layout},
        data() {
            return {
                docs: {
                    component: 'bDropdown',
                    events: [
                        {event: 'shown', description: ''},
                        {event: 'hidden', description: ''},
                        {event: 'click', description: 'Only in split mode'}
                    ]
                }
            };
        },
        methods: {
            click() {
                // eslint-disable-next-line no-alert
                window.alert('Clicked!');
            }
        }
    };
</script>
