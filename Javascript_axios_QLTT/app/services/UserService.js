function UserServices() {
    this.getListApi = function () {
        return axios({
            url: "https://60bc9acdb8ab37001759f4c9.mockapi.io/api/QLND",
            method: "GET",
        });
    };

    this.addApi = function (user) {
        return axios({
            url: "https://60bc9acdb8ab37001759f4c9.mockapi.io/api/QLND",
            method: "POST",
            data: user,
        });
    };

    this.deleteApi = function (id) {
        return axios({
            url: `https://60bc9acdb8ab37001759f4c9.mockapi.io/api/QLND/${id}`,
            method: "DELETE",
        });
    };

    this.getByIdApi = function (id) {
        return axios({
            url: `https://60bc9acdb8ab37001759f4c9.mockapi.io/api/QLND/${id}`,
            method: "GET",
        });
    };

    this.updateApi = function (user) {
        return axios({
            url: `https://60bc9acdb8ab37001759f4c9.mockapi.io/api/QLND/${user.id}`,
            method: "PUT",
            data: user,
        });
    };
}
