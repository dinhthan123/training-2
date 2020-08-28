@extends('layouts.app')

@section('content')
	<div class="panel panel-default">
        <div class="panel-heading">Users</div>
        <div class="panel-body table-responsive">
            <user-list-test fetch-url="{{$fetchUrl}}" :columns="{{json_encode($columns)}}"></user-list-test>
        </div>
    </div>
@endsection
