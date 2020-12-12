<template>
  <v-app
    :style="{ background: $vuetify.theme.themes.light.background }"
    style="max-height:100vw;"
  >
    <v-container style="min-height:100%;">
      <v-layout row class="ma-4">
        <v-app style="background-color:grey lighten-1:" class="rounded">
          <v-row>
            <v-col cols="12" md="8" class="ligne">
              <v-container>
                <v-row>
                  
                  
                  <v-col cols="12" md="12">
                    <h1 class="heading mb-2 grey--text thai-font">รายงานข้อมูล</h1>
                    <template>
                      <div id="app">
                        <GChart
                          type="ColumnChart"
                          :data="chartData"
                          :options="chartOptions"
                        />
                      </div>
                    </template>
                  </v-col>
                  <v-col cols="12" md12
                    ><h1 class="heading mb-2 grey--text">
                      งบประมาณ
                    </h1></v-col
                  >
                  <v-col cols="12" md="8">
                    <v-card>
                      <v-list>
                        <v-list-item>
                          <v-list-item-avatar color="blue">
                            <v-icon dark>fas fa-car</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title
                              >Auto & transport</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >$700 left</v-list-item-subtitle
                            >
                          </v-list-item-content>
                          <v-list-item-content align="right">
                            <v-list-item-title class="indigo--text"
                              >$1,200</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >$500 of 1,200</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-item>
                          <v-list-item-avatar color="red">
                            <v-icon dark>fas fa-utensils</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>Food & drinks</v-list-item-title>
                            <v-list-item-subtitle
                              >$2,100 left</v-list-item-subtitle
                            >
                          </v-list-item-content>
                          <v-list-item-content align="right">
                            <v-list-item-title class="indigo--text"
                              >$3,700</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >$1600 of 3,700</v-list-item-subtitle
                            >
                          </v-list-item-content> </v-list-item
                        ><v-divider inset></v-divider>
                        <v-list-item>
                          <v-list-item-avatar color="orange">
                            <v-icon dark>fas fa-dumbell</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>Sport</v-list-item-title>
                            <v-list-item-subtitle
                              >$350 left</v-list-item-subtitle
                            >
                          </v-list-item-content>
                          <v-list-item-content align="right">
                            <v-list-item-title class="indigo--text"
                              >$950</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >$600 of 950</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-item>
                          <v-list-item-avatar color="green">
                            <v-icon dark>fas fa-gamepad</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>Game</v-list-item-title>
                            <v-list-item-subtitle
                              >$150 left</v-list-item-subtitle
                            >
                          </v-list-item-content>
                          <v-list-item-content align="right">
                            <v-list-item-title class="indigo--text"
                              >$350</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >$200 of 150</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-card class="mx-auto" max-height="400">
                      <v-img
                        class="white--text align-end"
                        height="150px"
                        src="card.jpg"
                      ></v-img>
                      <v-card-title class="pb-0">Cash loan</v-card-title>
                      <v-card-text class="text-primary">
                        <div>Up to 2 million dollars</div>
                        <div>Money the next.Rate</div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-col cols="12" md="4">
              <v-container>
                <v-row>
                  <v-col cols="12" md12>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="profile.png"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>AAE IdeaPro</v-list-item-title>
                        <v-list-item-subtitle
                          >aaeideapro@gmail.com</v-list-item-subtitle
                        >
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-icon>fas fa-sign-out-alt</v-icon>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider>
                  </v-col>
                  <v-col cols="12" md12>
                    <v-list-item>
                      <v-list-item-avatar color="grey">
                        <v-icon color="white">fas fa-dollar-sign</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content
                        ><v-list-item-subtitle>Heisenberg</v-list-item-subtitle>
                        <v-list-item-title>$ 15,423</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-icon color="indigo" large>fab fa-cc-visa </v-icon>
                      </v-list-item-action>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md12>
                    <v-list-item>
                      <v-list-item-avatar color="grey">
                        <v-icon color="white">fas fa-dollar-sign</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content
                        ><v-list-item-subtitle
                          >Grat Wall wallet</v-list-item-subtitle
                        >
                        <v-list-item-title>$ 6,211</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-icon color="#073560 " large
                          >fab fa-cc-mastercard
                        </v-icon>
                      </v-list-item-action>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md12>
                    <v-list-item>
                      <v-list-item-avatar color="grey">
                        <v-icon color="white">fas fa-dollar-sign</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content
                        ><v-list-item-subtitle
                          >Stone River wallet</v-list-item-subtitle
                        >
                        <v-list-item-title>$ 15,423</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-icon color="#A90166" large>fab fa-cc-paypal</v-icon>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider>
                  </v-col>
                  <v-col cols="12" md12>
                    <v-list-item>
                      <v-list-item-avatar color="indigo">
                        <v-icon color="white">fas fa-plus</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>Add credit card</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-col cols="12" md12>
                      <v-card color="#952175" dark>
                        <div class="d-flex flex-no-wrap justify-space-between">
                          <div>
                            <v-card-title
                              class="headline"
                              style="font-size: 12px !important;"
                              >Upgrade your plan to <br />GOLD</v-card-title
                            >
                            <v-card-subtitle
                              >With Gold account plan you get access to premium
                              features</v-card-subtitle
                            >
                          </div>
                          <v-avatar class="ma-3" size="100" tile>
                            <v-img
                              style="border-radius: 2px;"
                              src="gold.jpg"
                            ></v-img>
                          </v-avatar>
                        </div>
                      </v-card>
                    </v-col>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-app>
      </v-layout>
    </v-container>
    <!-- <p style="color:#000; margin-top:0; text-align:center;">
      Copyright &copy; reserved 2020.
    </p> -->
  </v-app>
</template>

<script>
// @ is an alias to /src

export default {
  data: () => ({
    chartData: [
      ["Year", "Sales", "Expences", "Profit"],
      ["2014", 1000, 400, 200],
      ["2015", 1170, 460, 250],
      ["2016", 660, 400, 300],
      ["2017", 1030, 540, 350],
      ["2018", 1025, 530, 302],
      ["2019", 1040, 560, 356]
    ],
    chartOptions: {
      chart: {
        title: "Company performance",
        subtitle: "Sales,Expences,and Profit:2016-2019"
      }
    }
  }),
  name: "App",
  components: {},
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  }
};
</script>
<style scoped>

.thai-font{
  font-family: "Sarabun";
}
.rounded {
  border-radius: 30px;
}
.ligne {
  border-right: solid 1px #95a5a6;
}

icon-one {
  margin: 6rem;
  color: #95a5a6;
}
</style>