<template>
  <div>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        <span>{{collapsed?'':sysName}}</span>
        <span
          class="el-dropdown-link userinfo-inner"
          style="font-size:12px"
        >{{collapsed?'':sysUserName}}</span>
      </el-col>

      <el-col :span="10">
        <div class="tools" @click.prevent="collapse">
          <i class="el-icon-menu"></i>
        </div>
      </el-col>
      <el-col :span="4" class="userinfo">
        <span @click="logout" style="font-size:14px">[退出登录]</span>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu
          :default-active="entry.path"
          class="el-menu-vertical-demo menu-grunt"
          unique-opened
          router
          v-show="!collapsed"
        >
          <template v-for="(item,index) in adminmenudata">
            <el-submenu
              :index="index+''"
              :key="index+''"
              v-if="entrynodes(item.nodes) & item.ismenu == '1' & item.enable == '1'"
            >
              <template slot="title">
                <i :class="item.icon"></i>
                {{item.title}}
              </template>
              <el-menu-item
                v-for="(child,index) in item.nodes"
                :index="child.method"
                :key="index"
                class="elmenutime"
                @click="handselectclick(child)"
              >{{child.title}}</el-menu-item>
            </el-submenu>
            <el-menu-item
              v-if="!item.nodes & item.ismenu == '1' & item.enable == '1'"
              :index="item.method"
              :key="index"
              @click="handselectclick(item)"
            >
              <i :class="item.icon"></i>
              {{item.title}}
            </el-menu-item>
          </template>
        </el-menu>
        <!--导航菜单-折叠后-->
        <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
          <li v-for="(item,index) in adminmenudata" :key="index" class="el-submenu item">
            <template v-if="entrynodes(item.nodes) & item.ismenu == '1' & item.enable == '1'">
              <div
                class="el-submenu__title"
                style="padding-left: 20px;"
                @mouseover="showMenu(index,true)"
                @mouseout="showMenu(index,false)"
              >
                <i :class="item.icon"></i>
              </div>
              <ul
                class="el-menu submenu"
                :class="'submenu-hook-'+index"
                @mouseover="showMenu(index,true)"
                @mouseout="showMenu(index,false)"
              >
                <template v-for="(child,index) in item.nodes">
                  <li
                    class="el-menu-item"
                    style="padding-left: 40px;"
                    v-if="entrynodes(item.nodes)"
                    :class="$route.path==child.method?'is-active':''"
                    :key="index"
                    @click="handselectclick(child,index)"
                  >{{child.title}}</li>
                </template>
              </ul>
            </template>
            <template v-if="!item.nodes & item.ismenu == '1' & item.enable == '1'">
              <div
                class="el-submenu__title"
                style="padding-left: 20px;"
                @mouseover="showMenu(index,true)"
                @mouseout="showMenu(index,false)"
              >
                <i :class="item.icon"></i>
              </div>
              <ul
                class="el-menu submenu"
                :class="'submenu-hook-'+index"
                @mouseover="showMenu(index,true)"
                @mouseout="showMenu(index,false)"
              >
                <li
                  class="el-menu-item"
                  style="padding-left: 40px;"
                  :class="$route.path==item.method?'is-active':''"
                  :key="index"
                  @click="handselectclick(item,index)"
                >{{item.title}}</li>
              </ul>
            </template>
          </li>
        </ul>
      </aside>
      <section
        class="content-container"
        :class="[{'left-menu-collapsed' : collapsed,'left-menu-expanded' : !collapsed}]"
      >
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <el-tabs
              v-model="editableTabsValue"
              type="card"
              @tab-click="entryRouter(editableTabsValue)"
              editable
              @tab-remove="handleTabsremove"
              class="tabs-close"
            >
              <el-tab-pane
                :key="`${index}`"
                v-for="(item,index) in entry.router"
                :label="item.title"
                :name="`${index}`"
              ></el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <!-- <keep-alive> -->
              <router-view></router-view>
              <!-- </keep-alive> -->
            </transition>
            <msg v-if="$route.path==entry.path"></msg>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</div>

  
</template>
<script src="@/js/home.js"></script>
