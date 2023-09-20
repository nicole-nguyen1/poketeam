(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{7499:function(e,n,o){Promise.resolve().then(o.bind(o,8288))},8288:function(e,n,o){"use strict";o.r(n),o.d(n,{default:function(){return y}});var r=o(9268),t=o(6006),s=o(9061),a=o(7166),i=o(3653),p=o.n(i);function l(){return(0,r.jsx)("header",{className:p().header,children:(0,r.jsx)(s.W,{size:"md",className:p().inner,children:(0,r.jsx)(a.D,{order:3,children:"Poketeam"})})})}async function m(e,n){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};try{console.log("trying to fetch ".concat(n));let r=fetch("https://beta.pokeapi.co/graphql/v1beta",{credentials:"omit",headers:{"Content-Type":"application/json"},mode:"cors",body:JSON.stringify({query:e,operationName:n,variables:o}),method:"POST"}).then(e=>e.json());return{error:null,data:await r}}catch(e){if(console.log("there is an error of some sort"),e instanceof Error)return{error:e,data:null};return{error:"unknown error for ".concat(n),data:null}}}var d=o(347);function _(e){let{pokedexID:n,setPokedexID:o}=e,[s,a]=(0,t.useState)(""),[i,p]=(0,t.useState)(null);return(0,t.useEffect)(()=>{if(null==i){let e=async()=>{let e=await m("query getGames {\n  versions: pokemon_v2_versiongroup {\n    name\n    pokemon_v2_pokedexversiongroups {\n      pokedex_id\n    }\n  }\n}\n","getGames").then(async e=>{var n;return await (null===(n=e.data)||void 0===n?void 0:n.data)},e=>e.error);if(null!=e){let n=e.versions.filter(e=>{var n;return(null===(n=e.pokemon_v2_pokedexversiongroups[0])||void 0===n?void 0:n.pokedex_id)!=null}).map(e=>{var n;return{name:e.name,pokedex_id:null===(n=e.pokemon_v2_pokedexversiongroups[0])||void 0===n?void 0:n.pokedex_id}});p(n),o(n[0].pokedex_id),a(e.error)}};e()}},[i,o]),(0,r.jsx)(d.P,{placeholder:"Pick your Pokemon game",data:(null!=i?i:[]).map(e=>({value:"".concat(String(e.pokedex_id),"_").concat(e.name),label:e.name})),onChange:e=>o(Number(null==e?void 0:e.match(/\d+/))),error:s,mb:16,w:"100%"})}var u=o(8617),c=o(293),k=function(e){let{pokemons:n}=e;return(0,r.jsx)(u.k,{children:n.map(e=>(0,r.jsx)(c.q,{variant:"light",radius:"sm",size:"xl",src:e.sprite},e.name))})},f=o(2854),v=function(e){let{setError:n,setPokemons:o,pokedexID:s}=e,[a,i]=(0,t.useState)([]),[p,l]=(0,t.useState)("");return(0,t.useEffect)(()=>{if(null!=a){let e=a.map(e=>{let n=e.pokemon_species_id,o=e.pokedex_number,r=e.pokemon_v2_pokemonspecy.name,t=e.pokemon_v2_pokemonspecy.pokemon_v2_pokemons;if(t.length>1){let e=t.findIndex(e=>e.pokemon_v2_pokemonforms[0].form_name===p);if(e>0){let o=JSON.parse(t[e].pokemon_v2_pokemonforms[0].pokemon_v2_pokemonformsprites[0].sprites);n=o.front_default.match(/\d+/)}}let s="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/".concat(n,".png");return{id:n,pokedex_number:o,name:r,sprite:s}});o(e)}},[a,p,o]),(0,r.jsx)(f.z,{variant:"filled",onClick:()=>{let e=async()=>{let e=await m("query getSpecies($id: Int) {\n  pokedex: pokemon_v2_pokedex(where: {id: {_eq: $id}}) {\n		pokemon_v2_region {\n			name\n		}\n    pokemon_v2_pokemondexnumbers(order_by: {pokedex_number: asc}) {\n			id\n			pokedex_number\n			pokemon_species_id\n			pokemon_v2_pokemonspecy {\n				name\n				pokemon_v2_pokemons {\n					pokemon_v2_pokemonforms {\n						id\n						name\n						form_name\n						pokemon_v2_pokemonformsprites {\n							sprites\n						}\n					}\n					pokemon_v2_pokemontypes {\n						pokemon_v2_type {\n							name\n						}\n					}\n				}\n			}\n		}\n  }\n}\n","getSpecies",{id:s}).then(async e=>await (null==e?void 0:e.data),e=>e.error);null!=e&&(console.log(e),l(e.data.pokedex[0].pokemon_v2_region.name),i(e.data.pokedex[0].pokemon_v2_pokemondexnumbers),n(e.error))};e()},children:"Get Pokemon"})},x=o(6814),h=o.n(x);function y(){let[e,n]=(0,t.useState)(""),[o,a]=(0,t.useState)([]),[i,p]=(0,t.useState)(null);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l,{}),(0,r.jsxs)(s.W,{size:"md",className:h().inner,children:[(0,r.jsxs)(u.k,{direction:{base:"column",sm:"row"},gap:"sm",justify:"space-between",children:[(0,r.jsx)(_,{pokedexID:i,setPokedexID:p}),(0,r.jsx)(v,{pokedexID:i,setError:n,setPokemons:a})]}),null!=e&&(0,r.jsx)("p",{children:e}),(0,r.jsx)(k,{pokemons:o})]})]})}},3653:function(e){e.exports={header:"Header_header__eaNTi",inner:"Header_inner__kXKUg",link:"Header_link__qe_4D"}},6814:function(e){e.exports={inner:"page_inner__R7EMF"}},3177:function(e,n,o){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=o(6006),t=Symbol.for("react.element"),s=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,i=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function l(e,n,o){var r,s={},l=null,m=null;for(r in void 0!==o&&(l=""+o),void 0!==n.key&&(l=""+n.key),void 0!==n.ref&&(m=n.ref),n)a.call(n,r)&&!p.hasOwnProperty(r)&&(s[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps)void 0===s[r]&&(s[r]=n[r]);return{$$typeof:t,type:e,key:l,ref:m,props:s,_owner:i.current}}n.Fragment=s,n.jsx=l,n.jsxs=l},9268:function(e,n,o){"use strict";e.exports=o(3177)}},function(e){e.O(0,[562,667,488,744],function(){return e(e.s=7499)}),_N_E=e.O()}]);