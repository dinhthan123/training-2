@extends('layouts.app')

@section('content')
	<div class="panel panel-default">
        <div class="panel-heading">Users</div>
        <div class="panel-body table-responsive">
            <user-edit :edit-user-id="{{ $id }}"></user-edit>
        </div>
    </div>
@endsection