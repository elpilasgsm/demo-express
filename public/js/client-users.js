TREE.USERS = {
    getActionField: function (val) {
        return $("<div class='btn-group'>")
            .append($("<button class='btn btn-primary btn-sm'>").attr("entityId", val.id).text('Ред.').on('click', TREE.USERS.editPerson))
            .append($("<button class='btn btn-primary btn-sm'>").attr("entityId", val.id).text('Удал.').on('click', TREE.USERS.deletePerson));
    },
    editPerson: function () {
        var $bDate = $("#birthData");
        var $dDate = $("#deathDate");
        var id = $(this).attr("entityId");
        $.get("/rest/api/users/" + id, function (data) {
            if (data.person) {
                $("#editUserForm").show();
                $("#firstName").val(data.person.firstName);
                $("#lastName").val(data.person.lastName);
                $bDate.datepicker({
                    format: 'yyyy/mm/dd',
                });
                if (data.person.birthData)
                    $bDate.datepicker('setDate', data.person.birthData.split("T")[0]);
                $dDate.datepicker({
                    format: 'yyyy/mm/dd',
                });
                if (data.person.deathDate)
                    $dDate.datepicker('setDate', data.person.deathDate.split("T")[0]);
            }
        });
    },
    deletePerson: function () {
        var id = $(this).attr("entityId");
        $.ajax({
            url: "/rest/api/users/" + id,
            type: 'DELETE',
            success: function (data) {
                $("tr[entityId=" + id + "]").remove()
            }
        });
    },
    search: function () {
        $.get("/rest/api/users/search", {term: $('#searchTerm').val()}, function (data) {
            var $tbody = $("#users");
            $tbody.empty();
            if (data && data.persons) {
                $.each(data.persons, function (ind, val) {
                    $tbody
                        .append($("<tr>").attr("entityId", val.id)
                            .append($("<th>").text(val.firstName))
                            .append($("<th>").text(val.lastName))
                            .append($("<td>").text(moment(val.birthData).format('YYYY-MM-DD')))
                            .append($("<td>").text(val.deathDate ? moment(val.deathDate).format('YYYY-MM-DD') : "по н.в"))
                            .append($("<th>").append(TREE.USERS.getActionField(val))
                            ));
                });
            }
        });
    },
    init: function () {
        $('#search').on('click', TREE.USERS.search);
        $("#editCloseBtn").on('click', function () {
            $("#editUserForm").hide();
        });
        $("#editSaveBtn").on('click', function () {
            //TODO SAVE
            $("#editUserForm").hide();
        })
        TREE.USERS.search();
    }
};

$(document).ready(TREE.USERS.init);
