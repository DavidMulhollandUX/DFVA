// GENERATED FILE — DO NOT EDIT.
// Source: dfva/source/rubricV4.ts + dfva/source/evidence/*.json (panelCv4 blocks)
// Regenerate: npm --prefix scripts run dfva:gen-v4
// Eager maps over every per-program basis module, for scripts and tests. The
// client never imports this file: the report page loads one record through
// ./v4Basis/index, and the V4ReportPage bundle budget fails CI if these maps
// reach the browser.
// Types are canonical in v4Meta.ts (the light module every route may import);
// re-exported here so a file can import both a type and a value from this
// one specifier without also naming v4Meta.ts.
export type {
  V4Adjudication,
  V4ItemResult,
  V4GateResult,
  V4PanelC,
  V4PanelATier,
  V4PanelAGrain,
  V4PanelABasis,
  V4OnlyProgram,
} from "./v4Meta";
import type { V4PanelABasis, V4OnlyProgram } from "./v4Meta";
import b_038ab from "./v4Basis/038ab";
import b_080cl from "./v4Basis/080cl";
import b_080cn from "./v4Basis/080cn";
import b_097ab from "./v4Basis/097ab";
import b_175aa from "./v4Basis/175aa";
import b_192aa from "./v4Basis/192aa";
import b_195aa from "./v4Basis/195aa";
import b_244cw from "./v4Basis/244cw";
import b_274ab from "./v4Basis/274ab";
import b_277aa from "./v4Basis/277aa";
import b_294be from "./v4Basis/294be";
import b_300bb from "./v4Basis/300bb";
import b_305bb from "./v4Basis/305bb";
import b_342aa from "./v4Basis/342aa";
import b_344ab from "./v4Basis/344ab";
import b_439fs from "./v4Basis/439fs";
import b_502cw from "./v4Basis/502cw";
import b_504aa from "./v4Basis/504aa";
import b_507aa from "./v4Basis/507aa";
import b_510aa from "./v4Basis/510aa";
import b_511aa from "./v4Basis/511aa";
import b_526aa from "./v4Basis/526aa";
import b_527cl from "./v4Basis/527cl";
import b_527cn from "./v4Basis/527cn";
import b_635aa from "./v4Basis/635aa";
import b_706aa from "./v4Basis/706aa";
import b_742ab from "./v4Basis/742ab";
import b_746st from "./v4Basis/746st";
import b_761em from "./v4Basis/761em";
import b_841ac from "./v4Basis/841ac";
import b_872bb from "./v4Basis/872bb";
import b_991aa from "./v4Basis/991aa";
import b_adelaide_barts_bart from "./v4Basis/adelaide-barts_bart";
import b_adelaide_bcom_bcombcomacctbcomacctosbcomcorfin from "./v4Basis/adelaide-bcom_bcombcomacctbcomacctosbcomcorfin";
import b_adelaide_bcomp_bcmpsci from "./v4Basis/adelaide-bcomp_bcmpsci";
import b_adelaide_bengh_behcivs1 from "./v4Basis/adelaide-bengh_behcivs1";
import b_adelaide_blaws_llb from "./v4Basis/adelaide-blaws_llb";
import b_adelaide_bsc_bsci from "./v4Basis/adelaide-bsc_bsci";
import b_adelaide_mbusa_mbusad from "./v4Basis/adelaide-mbusa_mbusad";
import b_adelaide_mdsci_mdatasci from "./v4Basis/adelaide-mdsci_mdatasci";
import b_adelaide_mph_mpubhlt from "./v4Basis/adelaide-mph_mpubhlt";
import b_anu_aengi from "./v4Basis/anu-aengi";
import b_anu_allb from "./v4Basis/anu-allb";
import b_anu_barts from "./v4Basis/anu-barts";
import b_anu_bcomm from "./v4Basis/anu-bcomm";
import b_anu_bit from "./v4Basis/anu-bit";
import b_anu_bsc from "./v4Basis/anu-bsc";
import b_anu_mbusa from "./v4Basis/anu-mbusa";
import b_anu_mpubh from "./v4Basis/anu-mpubh";
import b_b_agr from "./v4Basis/b-agr";
import b_b_arts from "./v4Basis/b-arts";
import b_b_bmed from "./v4Basis/b-bmed";
import b_b_com from "./v4Basis/b-com";
import b_b_des from "./v4Basis/b-des";
import b_b_faacting from "./v4Basis/b-faacting";
import b_b_faanim from "./v4Basis/b-faanim";
import b_b_fadance from "./v4Basis/b-fadance";
import b_b_fafilmtv from "./v4Basis/b-fafilmtv";
import b_b_famusth from "./v4Basis/b-famusth";
import b_b_fapro from "./v4Basis/b-fapro";
import b_b_fascwri from "./v4Basis/b-fascwri";
import b_b_fath from "./v4Basis/b-fath";
import b_b_favisart from "./v4Basis/b-favisart";
import b_b_mus from "./v4Basis/b-mus";
import b_b_sci from "./v4Basis/b-sci";
import b_b_sciextd from "./v4Basis/b-sciextd";
import b_d01lf from "./v4Basis/d01lf";
import b_dr_philedp from "./v4Basis/dr-philedp";
import b_j17re from "./v4Basis/j17re";
import b_m04aa from "./v4Basis/m04aa";
import b_mc_actsc from "./v4Basis/mc-actsc";
import b_mc_actscen from "./v4Basis/mc-actscen";
import b_mc_actscex from "./v4Basis/mc-actscex";
import b_mc_adolhw from "./v4Basis/mc-adolhw";
import b_mc_advnpph from "./v4Basis/mc-advnpph";
import b_mc_aecoenh from "./v4Basis/mc-aecoenh";
import b_mc_aemtrcs from "./v4Basis/mc-aemtrcs";
import b_mc_agsc from "./v4Basis/mc-agsc";
import b_mc_aimo from "./v4Basis/mc-aimo";
import b_mc_anamgt from "./v4Basis/mc-anamgt";
import b_mc_anp from "./v4Basis/mc-anp";
import b_mc_anpnp from "./v4Basis/mc-anpnp";
import b_mc_ap from "./v4Basis/mc-ap";
import b_mc_apbusa from "./v4Basis/mc-apbusa";
import b_mc_apling from "./v4Basis/mc-apling";
import b_mc_app from "./v4Basis/mc-app";
import b_mc_arch from "./v4Basis/mc-arch";
import b_mc_archcm from "./v4Basis/mc-archcm";
import b_mc_archeng from "./v4Basis/mc-archeng";
import b_mc_archuch from "./v4Basis/mc-archuch";
import b_mc_archud from "./v4Basis/mc-archud";
import b_mc_archup from "./v4Basis/mc-archup";
import b_mc_arclarc from "./v4Basis/mc-arclarc";
import b_mc_arcprop from "./v4Basis/mc-arcprop";
import b_mc_ba from "./v4Basis/mc-ba";
import b_mc_bamktg from "./v4Basis/mc-bamktg";
import b_mc_base from "./v4Basis/mc-base";
import b_mc_biomeng from "./v4Basis/mc-biomeng";
import b_mc_biosenh from "./v4Basis/mc-biosenh";
import b_mc_bmedsc from "./v4Basis/mc-bmedsc";
import b_mc_bus from "./v4Basis/mc-bus";
import b_mc_busana from "./v4Basis/mc-busana";
import b_mc_cat from "./v4Basis/mc-cat";
import b_mc_chemeng from "./v4Basis/mc-chemeng";
import b_mc_civeng from "./v4Basis/mc-civeng";
import b_mc_climsci from "./v4Basis/mc-climsci";
import b_mc_clind from "./v4Basis/mc-clind";
import b_mc_clined from "./v4Basis/mc-clined";
import b_mc_clinrhb from "./v4Basis/mc-clinrhb";
import b_mc_cm from "./v4Basis/mc-cm";
import b_mc_cmprop from "./v4Basis/mc-cmprop";
import b_mc_cncrsc from "./v4Basis/mc-cncrsc";
import b_mc_comact from "./v4Basis/mc-comact";
import b_mc_comacts from "./v4Basis/mc-comacts";
import b_mc_comdrfs from "./v4Basis/mc-comdrfs";
import b_mc_comeco from "./v4Basis/mc-comeco";
import b_mc_comfin from "./v4Basis/mc-comfin";
import b_mc_commgmt from "./v4Basis/mc-commgmt";
import b_mc_commktg from "./v4Basis/mc-commktg";
import b_mc_contcs from "./v4Basis/mc-contcs";
import b_mc_counsmo from "./v4Basis/mc-counsmo";
import b_mc_cs from "./v4Basis/mc-cs";
import b_mc_ctpyart from "./v4Basis/mc-ctpyart";
import b_mc_cu from "./v4Basis/mc-cu";
import b_mc_culmc from "./v4Basis/mc-culmc";
import b_mc_cybscmo from "./v4Basis/mc-cybscmo";
import b_mc_datasc from "./v4Basis/mc-datasc";
import b_mc_ddensur from "./v4Basis/mc-ddensur";
import b_mc_desprod from "./v4Basis/mc-desprod";
import b_mc_dinfeng from "./v4Basis/mc-dinfeng";
import b_mc_dmed from "./v4Basis/mc-dmed";
import b_mc_dmktg from "./v4Basis/mc-dmktg";
import b_mc_dnce from "./v4Basis/mc-dnce";
import b_mc_doptom from "./v4Basis/mc-doptom";
import b_mc_dphysio from "./v4Basis/mc-dphysio";
import b_mc_dvetmed from "./v4Basis/mc-dvetmed";
import b_mc_eco from "./v4Basis/mc-eco";
import b_mc_ecosmc from "./v4Basis/mc-ecosmc";
import b_mc_ed from "./v4Basis/mc-ed";
import b_mc_edebt from "./v4Basis/mc-edebt";
import b_mc_eleceng from "./v4Basis/mc-eleceng";
import b_mc_engysys from "./v4Basis/mc-engysys";
import b_mc_enrslaw from "./v4Basis/mc-enrslaw";
import b_mc_ensysen from "./v4Basis/mc-ensysen";
import b_mc_entrpsp from "./v4Basis/mc-entrpsp";
import b_mc_env from "./v4Basis/mc-env";
import b_mc_enveng from "./v4Basis/mc-enveng";
import b_mc_envlaw from "./v4Basis/mc-envlaw";
import b_mc_envsc from "./v4Basis/mc-envsc";
import b_mc_evalo from "./v4Basis/mc-evalo";
import b_mc_filmtv from "./v4Basis/mc-filmtv";
import b_mc_finance from "./v4Basis/mc-finance";
import b_mc_finenh from "./v4Basis/mc-finenh";
import b_mc_foodpi from "./v4Basis/mc-foodpi";
import b_mc_gcclaw from "./v4Basis/mc-gcclaw";
import b_mc_gencoun from "./v4Basis/mc-gencoun";
import b_mc_genohlt from "./v4Basis/mc-genohlt";
import b_mc_geog from "./v4Basis/mc-geog";
import b_mc_geosc from "./v4Basis/mc-geosc";
import b_mc_gmcom from "./v4Basis/mc-gmcom";
import b_mc_hrmmo from "./v4Basis/mc-hrmmo";
import b_mc_humrlaw from "./v4Basis/mc-humrlaw";
import b_mc_ib from "./v4Basis/mc-ib";
import b_mc_ibl from "./v4Basis/mc-ibl";
import b_mc_indeng from "./v4Basis/mc-indeng";
import b_mc_inslead from "./v4Basis/mc-inslead";
import b_mc_intedib from "./v4Basis/mc-intedib";
import b_mc_intjour from "./v4Basis/mc-intjour";
import b_mc_ir from "./v4Basis/mc-ir";
import b_mc_is from "./v4Basis/mc-is";
import b_mc_it from "./v4Basis/mc-it";
import b_mc_journ from "./v4Basis/mc-journ";
import b_mc_jurisd from "./v4Basis/mc-jurisd";
import b_mc_larch from "./v4Basis/mc-larch";
import b_mc_larchud from "./v4Basis/mc-larchud";
import b_mc_larchup from "./v4Basis/mc-larchup";
import b_mc_li from "./v4Basis/mc-li";
import b_mc_mecheng from "./v4Basis/mc-mecheng";
import b_mc_mgmt from "./v4Basis/mc-mgmt";
import b_mc_mgmtact from "./v4Basis/mc-mgmtact";
import b_mc_mgmtafn from "./v4Basis/mc-mgmtafn";
import b_mc_mgmtein from "./v4Basis/mc-mgmtein";
import b_mc_mgmtfin from "./v4Basis/mc-mgmtfin";
import b_mc_mgmthre from "./v4Basis/mc-mgmthre";
import b_mc_mgmtmkt from "./v4Basis/mc-mgmtmkt";
import b_mc_mgmtscm from "./v4Basis/mc-mgmtscm";
import b_mc_mktcomm from "./v4Basis/mc-mktcomm";
import b_mc_mled from "./v4Basis/mc-mled";
import b_mc_mti from "./v4Basis/mc-mti";
import b_mc_mtrneng from "./v4Basis/mc-mtrneng";
import b_mc_musop from "./v4Basis/mc-musop";
import b_mc_musorp from "./v4Basis/mc-musorp";
import b_mc_muspt from "./v4Basis/mc-muspt";
import b_mc_ntcw from "./v4Basis/mc-ntcw";
import b_mc_nursc from "./v4Basis/mc-nursc";
import b_mc_phtypae from "./v4Basis/mc-phtypae";
import b_mc_phtyph from "./v4Basis/mc-phtyph";
import b_mc_privlaw from "./v4Basis/mc-privlaw";
import b_mc_prop from "./v4Basis/mc-prop";
import b_mc_propsyc from "./v4Basis/mc-propsyc";
import b_mc_propup from "./v4Basis/mc-propup";
import b_mc_psyched from "./v4Basis/mc-psyched";
import b_mc_pubcom from "./v4Basis/mc-pubcom";
import b_mc_scibif from "./v4Basis/mc-scibif";
import b_mc_scibio from "./v4Basis/mc-scibio";
import b_mc_scibit from "./v4Basis/mc-scibit";
import b_mc_sciche from "./v4Basis/mc-sciche";
import b_mc_sciear from "./v4Basis/mc-sciear";
import b_mc_sciepi from "./v4Basis/mc-sciepi";
import b_mc_scimat from "./v4Basis/mc-scimat";
import b_mc_sciphy from "./v4Basis/mc-sciphy";
import b_mc_scl from "./v4Basis/mc-scl";
import b_mc_scwr from "./v4Basis/mc-scwr";
import b_mc_socw from "./v4Basis/mc-socw";
import b_mc_softeng from "./v4Basis/mc-softeng";
import b_mc_spchpth from "./v4Basis/mc-spchpth";
import b_mc_spmed from "./v4Basis/mc-spmed";
import b_mc_surged from "./v4Basis/mc-surged";
import b_mc_tchecp from "./v4Basis/mc-tchecp";
import b_mc_teachec from "./v4Basis/mc-teachec";
import b_mc_teachpr from "./v4Basis/mc-teachpr";
import b_mc_teachsa from "./v4Basis/mc-teachsa";
import b_mc_teachsi from "./v4Basis/mc-teachsi";
import b_mc_tesol from "./v4Basis/mc-tesol";
import b_mc_thtr from "./v4Basis/mc-thtr";
import b_mc_thtrdir from "./v4Basis/mc-thtrdir";
import b_mc_thtrdra from "./v4Basis/mc-thtrdra";
import b_mc_thtrwri from "./v4Basis/mc-thtrwri";
import b_mc_tranint from "./v4Basis/mc-tranint";
import b_mc_uch from "./v4Basis/mc-uch";
import b_mc_upud from "./v4Basis/mc-upud";
import b_mc_urbdes from "./v4Basis/mc-urbdes";
import b_mc_urbhort from "./v4Basis/mc-urbhort";
import b_mc_urpl from "./v4Basis/mc-urpl";
import b_mc_vetstdr from "./v4Basis/mc-vetstdr";
import b_mc_ymhmo from "./v4Basis/mc-ymhmo";
import b_me_dcd from "./v4Basis/me-dcd";
import b_monash_a2000 from "./v4Basis/monash-a2000";
import b_monash_b2001 from "./v4Basis/monash-b2001";
import b_monash_c2004 from "./v4Basis/monash-c2004";
import b_monash_c6009 from "./v4Basis/monash-c6009";
import b_monash_e3001 from "./v4Basis/monash-e3001";
import b_monash_l3001 from "./v4Basis/monash-l3001";
import b_monash_m6024 from "./v4Basis/monash-m6024";
import b_monash_s2000 from "./v4Basis/monash-s2000";
import b_n01aa from "./v4Basis/n01aa";
import b_unsw_3502 from "./v4Basis/unsw-3502";
import b_unsw_3970 from "./v4Basis/unsw-3970";
import b_unsw_4461 from "./v4Basis/unsw-4461";
import b_unsw_4701 from "./v4Basis/unsw-4701";
import b_unsw_7002 from "./v4Basis/unsw-7002";
import b_unsw_7003 from "./v4Basis/unsw-7003";
import b_unsw_8351 from "./v4Basis/unsw-8351";
import b_unsw_8646 from "./v4Basis/unsw-8646";
import b_unsw_9045 from "./v4Basis/unsw-9045";
import b_uq_2000 from "./v4Basis/uq-2000";
import b_uq_2336 from "./v4Basis/uq-2336";
import b_uq_2455 from "./v4Basis/uq-2455";
import b_uq_2461 from "./v4Basis/uq-2461";
import b_uq_2471 from "./v4Basis/uq-2471";
import b_uq_2559 from "./v4Basis/uq-2559";
import b_uq_5660 from "./v4Basis/uq-5660";
import b_uq_5760 from "./v4Basis/uq-5760";
import b_uq_5770 from "./v4Basis/uq-5770";
import b_usyd_advanced_computing_commerce from "./v4Basis/usyd-advanced-computing-commerce";
import b_usyd_arts_extended from "./v4Basis/usyd-arts-extended";
import b_usyd_education from "./v4Basis/usyd-education";
import b_usyd_juris_doctor from "./v4Basis/usyd-juris-doctor";
import b_usyd_mba_technology_digital_strategy from "./v4Basis/usyd-mba-technology-digital-strategy";
import b_usyd_psychology_coaching from "./v4Basis/usyd-psychology-coaching";
import b_usyd_science_extended from "./v4Basis/usyd-science-extended";
import b_uwa_42520 from "./v4Basis/uwa-42520";
import b_uwa_62530 from "./v4Basis/uwa-62530";
import b_uwa_92550 from "./v4Basis/uwa-92550";
import b_uwa_bh011 from "./v4Basis/uwa-bh011";
import b_uwa_bp001 from "./v4Basis/uwa-bp001";
import b_uwa_bp002 from "./v4Basis/uwa-bp002";
import b_uwa_bp004 from "./v4Basis/uwa-bp004";

/** Panel A basis and exposure data for programs scored on v4 but absent from
 *  the v3 registry (docs: no taught curriculum, or scored ahead of a v1
 *  report). */
export const V4_ONLY_PROGRAMS: Record<string, V4OnlyProgram> = Object.fromEntries(
  ([
    ["038ab", b_038ab.onlyProgram],
    ["080cl", b_080cl.onlyProgram],
    ["080cn", b_080cn.onlyProgram],
    ["097ab", b_097ab.onlyProgram],
    ["175aa", b_175aa.onlyProgram],
    ["192aa", b_192aa.onlyProgram],
    ["195aa", b_195aa.onlyProgram],
    ["244cw", b_244cw.onlyProgram],
    ["274ab", b_274ab.onlyProgram],
    ["277aa", b_277aa.onlyProgram],
    ["294be", b_294be.onlyProgram],
    ["300bb", b_300bb.onlyProgram],
    ["305bb", b_305bb.onlyProgram],
    ["342aa", b_342aa.onlyProgram],
    ["344ab", b_344ab.onlyProgram],
    ["439fs", b_439fs.onlyProgram],
    ["502cw", b_502cw.onlyProgram],
    ["504aa", b_504aa.onlyProgram],
    ["507aa", b_507aa.onlyProgram],
    ["510aa", b_510aa.onlyProgram],
    ["511aa", b_511aa.onlyProgram],
    ["526aa", b_526aa.onlyProgram],
    ["527cl", b_527cl.onlyProgram],
    ["527cn", b_527cn.onlyProgram],
    ["635aa", b_635aa.onlyProgram],
    ["706aa", b_706aa.onlyProgram],
    ["742ab", b_742ab.onlyProgram],
    ["746st", b_746st.onlyProgram],
    ["761em", b_761em.onlyProgram],
    ["841ac", b_841ac.onlyProgram],
    ["872bb", b_872bb.onlyProgram],
    ["991aa", b_991aa.onlyProgram],
    ["adelaide-barts_bart", b_adelaide_barts_bart.onlyProgram],
    ["adelaide-bcom_bcombcomacctbcomacctosbcomcorfin", b_adelaide_bcom_bcombcomacctbcomacctosbcomcorfin.onlyProgram],
    ["adelaide-bcomp_bcmpsci", b_adelaide_bcomp_bcmpsci.onlyProgram],
    ["adelaide-bengh_behcivs1", b_adelaide_bengh_behcivs1.onlyProgram],
    ["adelaide-blaws_llb", b_adelaide_blaws_llb.onlyProgram],
    ["adelaide-bsc_bsci", b_adelaide_bsc_bsci.onlyProgram],
    ["adelaide-mbusa_mbusad", b_adelaide_mbusa_mbusad.onlyProgram],
    ["adelaide-mdsci_mdatasci", b_adelaide_mdsci_mdatasci.onlyProgram],
    ["adelaide-mph_mpubhlt", b_adelaide_mph_mpubhlt.onlyProgram],
    ["anu-aengi", b_anu_aengi.onlyProgram],
    ["anu-allb", b_anu_allb.onlyProgram],
    ["anu-barts", b_anu_barts.onlyProgram],
    ["anu-bcomm", b_anu_bcomm.onlyProgram],
    ["anu-bit", b_anu_bit.onlyProgram],
    ["anu-bsc", b_anu_bsc.onlyProgram],
    ["anu-mbusa", b_anu_mbusa.onlyProgram],
    ["anu-mpubh", b_anu_mpubh.onlyProgram],
    ["b-agr", b_b_agr.onlyProgram],
    ["b-arts", b_b_arts.onlyProgram],
    ["b-bmed", b_b_bmed.onlyProgram],
    ["b-com", b_b_com.onlyProgram],
    ["b-des", b_b_des.onlyProgram],
    ["b-faacting", b_b_faacting.onlyProgram],
    ["b-faanim", b_b_faanim.onlyProgram],
    ["b-fadance", b_b_fadance.onlyProgram],
    ["b-fafilmtv", b_b_fafilmtv.onlyProgram],
    ["b-famusth", b_b_famusth.onlyProgram],
    ["b-fapro", b_b_fapro.onlyProgram],
    ["b-fascwri", b_b_fascwri.onlyProgram],
    ["b-fath", b_b_fath.onlyProgram],
    ["b-favisart", b_b_favisart.onlyProgram],
    ["b-mus", b_b_mus.onlyProgram],
    ["b-sci", b_b_sci.onlyProgram],
    ["b-sciextd", b_b_sciextd.onlyProgram],
    ["d01lf", b_d01lf.onlyProgram],
    ["dr-philedp", b_dr_philedp.onlyProgram],
    ["j17re", b_j17re.onlyProgram],
    ["m04aa", b_m04aa.onlyProgram],
    ["mc-actsc", b_mc_actsc.onlyProgram],
    ["mc-actscen", b_mc_actscen.onlyProgram],
    ["mc-actscex", b_mc_actscex.onlyProgram],
    ["mc-adolhw", b_mc_adolhw.onlyProgram],
    ["mc-advnpph", b_mc_advnpph.onlyProgram],
    ["mc-aecoenh", b_mc_aecoenh.onlyProgram],
    ["mc-aemtrcs", b_mc_aemtrcs.onlyProgram],
    ["mc-agsc", b_mc_agsc.onlyProgram],
    ["mc-aimo", b_mc_aimo.onlyProgram],
    ["mc-anamgt", b_mc_anamgt.onlyProgram],
    ["mc-anp", b_mc_anp.onlyProgram],
    ["mc-anpnp", b_mc_anpnp.onlyProgram],
    ["mc-ap", b_mc_ap.onlyProgram],
    ["mc-apbusa", b_mc_apbusa.onlyProgram],
    ["mc-apling", b_mc_apling.onlyProgram],
    ["mc-app", b_mc_app.onlyProgram],
    ["mc-arch", b_mc_arch.onlyProgram],
    ["mc-archcm", b_mc_archcm.onlyProgram],
    ["mc-archeng", b_mc_archeng.onlyProgram],
    ["mc-archuch", b_mc_archuch.onlyProgram],
    ["mc-archud", b_mc_archud.onlyProgram],
    ["mc-archup", b_mc_archup.onlyProgram],
    ["mc-arclarc", b_mc_arclarc.onlyProgram],
    ["mc-arcprop", b_mc_arcprop.onlyProgram],
    ["mc-ba", b_mc_ba.onlyProgram],
    ["mc-bamktg", b_mc_bamktg.onlyProgram],
    ["mc-base", b_mc_base.onlyProgram],
    ["mc-biomeng", b_mc_biomeng.onlyProgram],
    ["mc-biosenh", b_mc_biosenh.onlyProgram],
    ["mc-bmedsc", b_mc_bmedsc.onlyProgram],
    ["mc-bus", b_mc_bus.onlyProgram],
    ["mc-busana", b_mc_busana.onlyProgram],
    ["mc-cat", b_mc_cat.onlyProgram],
    ["mc-chemeng", b_mc_chemeng.onlyProgram],
    ["mc-civeng", b_mc_civeng.onlyProgram],
    ["mc-climsci", b_mc_climsci.onlyProgram],
    ["mc-clind", b_mc_clind.onlyProgram],
    ["mc-clined", b_mc_clined.onlyProgram],
    ["mc-clinrhb", b_mc_clinrhb.onlyProgram],
    ["mc-cm", b_mc_cm.onlyProgram],
    ["mc-cmprop", b_mc_cmprop.onlyProgram],
    ["mc-cncrsc", b_mc_cncrsc.onlyProgram],
    ["mc-comact", b_mc_comact.onlyProgram],
    ["mc-comacts", b_mc_comacts.onlyProgram],
    ["mc-comdrfs", b_mc_comdrfs.onlyProgram],
    ["mc-comeco", b_mc_comeco.onlyProgram],
    ["mc-comfin", b_mc_comfin.onlyProgram],
    ["mc-commgmt", b_mc_commgmt.onlyProgram],
    ["mc-commktg", b_mc_commktg.onlyProgram],
    ["mc-contcs", b_mc_contcs.onlyProgram],
    ["mc-counsmo", b_mc_counsmo.onlyProgram],
    ["mc-cs", b_mc_cs.onlyProgram],
    ["mc-ctpyart", b_mc_ctpyart.onlyProgram],
    ["mc-cu", b_mc_cu.onlyProgram],
    ["mc-culmc", b_mc_culmc.onlyProgram],
    ["mc-cybscmo", b_mc_cybscmo.onlyProgram],
    ["mc-datasc", b_mc_datasc.onlyProgram],
    ["mc-ddensur", b_mc_ddensur.onlyProgram],
    ["mc-desprod", b_mc_desprod.onlyProgram],
    ["mc-dinfeng", b_mc_dinfeng.onlyProgram],
    ["mc-dmed", b_mc_dmed.onlyProgram],
    ["mc-dmktg", b_mc_dmktg.onlyProgram],
    ["mc-dnce", b_mc_dnce.onlyProgram],
    ["mc-doptom", b_mc_doptom.onlyProgram],
    ["mc-dphysio", b_mc_dphysio.onlyProgram],
    ["mc-dvetmed", b_mc_dvetmed.onlyProgram],
    ["mc-eco", b_mc_eco.onlyProgram],
    ["mc-ecosmc", b_mc_ecosmc.onlyProgram],
    ["mc-ed", b_mc_ed.onlyProgram],
    ["mc-edebt", b_mc_edebt.onlyProgram],
    ["mc-eleceng", b_mc_eleceng.onlyProgram],
    ["mc-engysys", b_mc_engysys.onlyProgram],
    ["mc-enrslaw", b_mc_enrslaw.onlyProgram],
    ["mc-ensysen", b_mc_ensysen.onlyProgram],
    ["mc-entrpsp", b_mc_entrpsp.onlyProgram],
    ["mc-env", b_mc_env.onlyProgram],
    ["mc-enveng", b_mc_enveng.onlyProgram],
    ["mc-envlaw", b_mc_envlaw.onlyProgram],
    ["mc-envsc", b_mc_envsc.onlyProgram],
    ["mc-evalo", b_mc_evalo.onlyProgram],
    ["mc-filmtv", b_mc_filmtv.onlyProgram],
    ["mc-finance", b_mc_finance.onlyProgram],
    ["mc-finenh", b_mc_finenh.onlyProgram],
    ["mc-foodpi", b_mc_foodpi.onlyProgram],
    ["mc-gcclaw", b_mc_gcclaw.onlyProgram],
    ["mc-gencoun", b_mc_gencoun.onlyProgram],
    ["mc-genohlt", b_mc_genohlt.onlyProgram],
    ["mc-geog", b_mc_geog.onlyProgram],
    ["mc-geosc", b_mc_geosc.onlyProgram],
    ["mc-gmcom", b_mc_gmcom.onlyProgram],
    ["mc-hrmmo", b_mc_hrmmo.onlyProgram],
    ["mc-humrlaw", b_mc_humrlaw.onlyProgram],
    ["mc-ib", b_mc_ib.onlyProgram],
    ["mc-ibl", b_mc_ibl.onlyProgram],
    ["mc-indeng", b_mc_indeng.onlyProgram],
    ["mc-inslead", b_mc_inslead.onlyProgram],
    ["mc-intedib", b_mc_intedib.onlyProgram],
    ["mc-intjour", b_mc_intjour.onlyProgram],
    ["mc-ir", b_mc_ir.onlyProgram],
    ["mc-is", b_mc_is.onlyProgram],
    ["mc-it", b_mc_it.onlyProgram],
    ["mc-journ", b_mc_journ.onlyProgram],
    ["mc-jurisd", b_mc_jurisd.onlyProgram],
    ["mc-larch", b_mc_larch.onlyProgram],
    ["mc-larchud", b_mc_larchud.onlyProgram],
    ["mc-larchup", b_mc_larchup.onlyProgram],
    ["mc-li", b_mc_li.onlyProgram],
    ["mc-mecheng", b_mc_mecheng.onlyProgram],
    ["mc-mgmt", b_mc_mgmt.onlyProgram],
    ["mc-mgmtact", b_mc_mgmtact.onlyProgram],
    ["mc-mgmtafn", b_mc_mgmtafn.onlyProgram],
    ["mc-mgmtein", b_mc_mgmtein.onlyProgram],
    ["mc-mgmtfin", b_mc_mgmtfin.onlyProgram],
    ["mc-mgmthre", b_mc_mgmthre.onlyProgram],
    ["mc-mgmtmkt", b_mc_mgmtmkt.onlyProgram],
    ["mc-mgmtscm", b_mc_mgmtscm.onlyProgram],
    ["mc-mktcomm", b_mc_mktcomm.onlyProgram],
    ["mc-mled", b_mc_mled.onlyProgram],
    ["mc-mti", b_mc_mti.onlyProgram],
    ["mc-mtrneng", b_mc_mtrneng.onlyProgram],
    ["mc-musop", b_mc_musop.onlyProgram],
    ["mc-musorp", b_mc_musorp.onlyProgram],
    ["mc-muspt", b_mc_muspt.onlyProgram],
    ["mc-ntcw", b_mc_ntcw.onlyProgram],
    ["mc-nursc", b_mc_nursc.onlyProgram],
    ["mc-phtypae", b_mc_phtypae.onlyProgram],
    ["mc-phtyph", b_mc_phtyph.onlyProgram],
    ["mc-privlaw", b_mc_privlaw.onlyProgram],
    ["mc-prop", b_mc_prop.onlyProgram],
    ["mc-propsyc", b_mc_propsyc.onlyProgram],
    ["mc-propup", b_mc_propup.onlyProgram],
    ["mc-psyched", b_mc_psyched.onlyProgram],
    ["mc-pubcom", b_mc_pubcom.onlyProgram],
    ["mc-scibif", b_mc_scibif.onlyProgram],
    ["mc-scibio", b_mc_scibio.onlyProgram],
    ["mc-scibit", b_mc_scibit.onlyProgram],
    ["mc-sciche", b_mc_sciche.onlyProgram],
    ["mc-sciear", b_mc_sciear.onlyProgram],
    ["mc-sciepi", b_mc_sciepi.onlyProgram],
    ["mc-scimat", b_mc_scimat.onlyProgram],
    ["mc-sciphy", b_mc_sciphy.onlyProgram],
    ["mc-scl", b_mc_scl.onlyProgram],
    ["mc-scwr", b_mc_scwr.onlyProgram],
    ["mc-socw", b_mc_socw.onlyProgram],
    ["mc-softeng", b_mc_softeng.onlyProgram],
    ["mc-spchpth", b_mc_spchpth.onlyProgram],
    ["mc-spmed", b_mc_spmed.onlyProgram],
    ["mc-surged", b_mc_surged.onlyProgram],
    ["mc-tchecp", b_mc_tchecp.onlyProgram],
    ["mc-teachec", b_mc_teachec.onlyProgram],
    ["mc-teachpr", b_mc_teachpr.onlyProgram],
    ["mc-teachsa", b_mc_teachsa.onlyProgram],
    ["mc-teachsi", b_mc_teachsi.onlyProgram],
    ["mc-tesol", b_mc_tesol.onlyProgram],
    ["mc-thtr", b_mc_thtr.onlyProgram],
    ["mc-thtrdir", b_mc_thtrdir.onlyProgram],
    ["mc-thtrdra", b_mc_thtrdra.onlyProgram],
    ["mc-thtrwri", b_mc_thtrwri.onlyProgram],
    ["mc-tranint", b_mc_tranint.onlyProgram],
    ["mc-uch", b_mc_uch.onlyProgram],
    ["mc-upud", b_mc_upud.onlyProgram],
    ["mc-urbdes", b_mc_urbdes.onlyProgram],
    ["mc-urbhort", b_mc_urbhort.onlyProgram],
    ["mc-urpl", b_mc_urpl.onlyProgram],
    ["mc-vetstdr", b_mc_vetstdr.onlyProgram],
    ["mc-ymhmo", b_mc_ymhmo.onlyProgram],
    ["me-dcd", b_me_dcd.onlyProgram],
    ["monash-a2000", b_monash_a2000.onlyProgram],
    ["monash-b2001", b_monash_b2001.onlyProgram],
    ["monash-c2004", b_monash_c2004.onlyProgram],
    ["monash-c6009", b_monash_c6009.onlyProgram],
    ["monash-e3001", b_monash_e3001.onlyProgram],
    ["monash-l3001", b_monash_l3001.onlyProgram],
    ["monash-m6024", b_monash_m6024.onlyProgram],
    ["monash-s2000", b_monash_s2000.onlyProgram],
    ["n01aa", b_n01aa.onlyProgram],
    ["unsw-3502", b_unsw_3502.onlyProgram],
    ["unsw-3970", b_unsw_3970.onlyProgram],
    ["unsw-4461", b_unsw_4461.onlyProgram],
    ["unsw-4701", b_unsw_4701.onlyProgram],
    ["unsw-7002", b_unsw_7002.onlyProgram],
    ["unsw-7003", b_unsw_7003.onlyProgram],
    ["unsw-8351", b_unsw_8351.onlyProgram],
    ["unsw-8646", b_unsw_8646.onlyProgram],
    ["unsw-9045", b_unsw_9045.onlyProgram],
    ["uq-2000", b_uq_2000.onlyProgram],
    ["uq-2336", b_uq_2336.onlyProgram],
    ["uq-2455", b_uq_2455.onlyProgram],
    ["uq-2461", b_uq_2461.onlyProgram],
    ["uq-2471", b_uq_2471.onlyProgram],
    ["uq-2559", b_uq_2559.onlyProgram],
    ["uq-5660", b_uq_5660.onlyProgram],
    ["uq-5760", b_uq_5760.onlyProgram],
    ["uq-5770", b_uq_5770.onlyProgram],
    ["usyd-advanced-computing-commerce", b_usyd_advanced_computing_commerce.onlyProgram],
    ["usyd-arts-extended", b_usyd_arts_extended.onlyProgram],
    ["usyd-education", b_usyd_education.onlyProgram],
    ["usyd-juris-doctor", b_usyd_juris_doctor.onlyProgram],
    ["usyd-mba-technology-digital-strategy", b_usyd_mba_technology_digital_strategy.onlyProgram],
    ["usyd-psychology-coaching", b_usyd_psychology_coaching.onlyProgram],
    ["usyd-science-extended", b_usyd_science_extended.onlyProgram],
    ["uwa-42520", b_uwa_42520.onlyProgram],
    ["uwa-62530", b_uwa_62530.onlyProgram],
    ["uwa-92550", b_uwa_92550.onlyProgram],
    ["uwa-bh011", b_uwa_bh011.onlyProgram],
    ["uwa-bp001", b_uwa_bp001.onlyProgram],
    ["uwa-bp002", b_uwa_bp002.onlyProgram],
    ["uwa-bp004", b_uwa_bp004.onlyProgram],
  ] as const).filter(([, v]) => v !== null),
) as Record<string, V4OnlyProgram>;

/** Panel A basis for every program scored on v4, reference cohort included
 *  (their exposure VALUE still comes from v3Programs.ts; this is the label).
 *  The bare tier (no sources/grain) is also carried on V4_INDEX in
 *  v4Meta.ts for the light routes; this full object is for the report page. */
export const V4_PANEL_A_BASIS: Record<string, V4PanelABasis> = Object.fromEntries(
  ([
    ["038ab", b_038ab.panelABasis],
    ["080cl", b_080cl.panelABasis],
    ["080cn", b_080cn.panelABasis],
    ["097ab", b_097ab.panelABasis],
    ["175aa", b_175aa.panelABasis],
    ["192aa", b_192aa.panelABasis],
    ["195aa", b_195aa.panelABasis],
    ["244cw", b_244cw.panelABasis],
    ["274ab", b_274ab.panelABasis],
    ["277aa", b_277aa.panelABasis],
    ["294be", b_294be.panelABasis],
    ["300bb", b_300bb.panelABasis],
    ["305bb", b_305bb.panelABasis],
    ["342aa", b_342aa.panelABasis],
    ["344ab", b_344ab.panelABasis],
    ["439fs", b_439fs.panelABasis],
    ["502cw", b_502cw.panelABasis],
    ["504aa", b_504aa.panelABasis],
    ["507aa", b_507aa.panelABasis],
    ["510aa", b_510aa.panelABasis],
    ["511aa", b_511aa.panelABasis],
    ["526aa", b_526aa.panelABasis],
    ["527cl", b_527cl.panelABasis],
    ["527cn", b_527cn.panelABasis],
    ["635aa", b_635aa.panelABasis],
    ["706aa", b_706aa.panelABasis],
    ["742ab", b_742ab.panelABasis],
    ["746st", b_746st.panelABasis],
    ["761em", b_761em.panelABasis],
    ["841ac", b_841ac.panelABasis],
    ["872bb", b_872bb.panelABasis],
    ["991aa", b_991aa.panelABasis],
    ["adelaide-barts_bart", b_adelaide_barts_bart.panelABasis],
    ["adelaide-bcom_bcombcomacctbcomacctosbcomcorfin", b_adelaide_bcom_bcombcomacctbcomacctosbcomcorfin.panelABasis],
    ["adelaide-bcomp_bcmpsci", b_adelaide_bcomp_bcmpsci.panelABasis],
    ["adelaide-bengh_behcivs1", b_adelaide_bengh_behcivs1.panelABasis],
    ["adelaide-blaws_llb", b_adelaide_blaws_llb.panelABasis],
    ["adelaide-bsc_bsci", b_adelaide_bsc_bsci.panelABasis],
    ["adelaide-mbusa_mbusad", b_adelaide_mbusa_mbusad.panelABasis],
    ["adelaide-mdsci_mdatasci", b_adelaide_mdsci_mdatasci.panelABasis],
    ["adelaide-mph_mpubhlt", b_adelaide_mph_mpubhlt.panelABasis],
    ["anu-aengi", b_anu_aengi.panelABasis],
    ["anu-allb", b_anu_allb.panelABasis],
    ["anu-barts", b_anu_barts.panelABasis],
    ["anu-bcomm", b_anu_bcomm.panelABasis],
    ["anu-bit", b_anu_bit.panelABasis],
    ["anu-bsc", b_anu_bsc.panelABasis],
    ["anu-mbusa", b_anu_mbusa.panelABasis],
    ["anu-mpubh", b_anu_mpubh.panelABasis],
    ["b-agr", b_b_agr.panelABasis],
    ["b-arts", b_b_arts.panelABasis],
    ["b-bmed", b_b_bmed.panelABasis],
    ["b-com", b_b_com.panelABasis],
    ["b-des", b_b_des.panelABasis],
    ["b-faacting", b_b_faacting.panelABasis],
    ["b-faanim", b_b_faanim.panelABasis],
    ["b-fadance", b_b_fadance.panelABasis],
    ["b-fafilmtv", b_b_fafilmtv.panelABasis],
    ["b-famusth", b_b_famusth.panelABasis],
    ["b-fapro", b_b_fapro.panelABasis],
    ["b-fascwri", b_b_fascwri.panelABasis],
    ["b-fath", b_b_fath.panelABasis],
    ["b-favisart", b_b_favisart.panelABasis],
    ["b-mus", b_b_mus.panelABasis],
    ["b-sci", b_b_sci.panelABasis],
    ["b-sciextd", b_b_sciextd.panelABasis],
    ["d01lf", b_d01lf.panelABasis],
    ["dr-philedp", b_dr_philedp.panelABasis],
    ["j17re", b_j17re.panelABasis],
    ["m04aa", b_m04aa.panelABasis],
    ["mc-actsc", b_mc_actsc.panelABasis],
    ["mc-actscen", b_mc_actscen.panelABasis],
    ["mc-actscex", b_mc_actscex.panelABasis],
    ["mc-adolhw", b_mc_adolhw.panelABasis],
    ["mc-advnpph", b_mc_advnpph.panelABasis],
    ["mc-aecoenh", b_mc_aecoenh.panelABasis],
    ["mc-aemtrcs", b_mc_aemtrcs.panelABasis],
    ["mc-agsc", b_mc_agsc.panelABasis],
    ["mc-aimo", b_mc_aimo.panelABasis],
    ["mc-anamgt", b_mc_anamgt.panelABasis],
    ["mc-anp", b_mc_anp.panelABasis],
    ["mc-anpnp", b_mc_anpnp.panelABasis],
    ["mc-ap", b_mc_ap.panelABasis],
    ["mc-apbusa", b_mc_apbusa.panelABasis],
    ["mc-apling", b_mc_apling.panelABasis],
    ["mc-app", b_mc_app.panelABasis],
    ["mc-arch", b_mc_arch.panelABasis],
    ["mc-archcm", b_mc_archcm.panelABasis],
    ["mc-archeng", b_mc_archeng.panelABasis],
    ["mc-archuch", b_mc_archuch.panelABasis],
    ["mc-archud", b_mc_archud.panelABasis],
    ["mc-archup", b_mc_archup.panelABasis],
    ["mc-arclarc", b_mc_arclarc.panelABasis],
    ["mc-arcprop", b_mc_arcprop.panelABasis],
    ["mc-ba", b_mc_ba.panelABasis],
    ["mc-bamktg", b_mc_bamktg.panelABasis],
    ["mc-base", b_mc_base.panelABasis],
    ["mc-biomeng", b_mc_biomeng.panelABasis],
    ["mc-biosenh", b_mc_biosenh.panelABasis],
    ["mc-bmedsc", b_mc_bmedsc.panelABasis],
    ["mc-bus", b_mc_bus.panelABasis],
    ["mc-busana", b_mc_busana.panelABasis],
    ["mc-cat", b_mc_cat.panelABasis],
    ["mc-chemeng", b_mc_chemeng.panelABasis],
    ["mc-civeng", b_mc_civeng.panelABasis],
    ["mc-climsci", b_mc_climsci.panelABasis],
    ["mc-clind", b_mc_clind.panelABasis],
    ["mc-clined", b_mc_clined.panelABasis],
    ["mc-clinrhb", b_mc_clinrhb.panelABasis],
    ["mc-cm", b_mc_cm.panelABasis],
    ["mc-cmprop", b_mc_cmprop.panelABasis],
    ["mc-cncrsc", b_mc_cncrsc.panelABasis],
    ["mc-comact", b_mc_comact.panelABasis],
    ["mc-comacts", b_mc_comacts.panelABasis],
    ["mc-comdrfs", b_mc_comdrfs.panelABasis],
    ["mc-comeco", b_mc_comeco.panelABasis],
    ["mc-comfin", b_mc_comfin.panelABasis],
    ["mc-commgmt", b_mc_commgmt.panelABasis],
    ["mc-commktg", b_mc_commktg.panelABasis],
    ["mc-contcs", b_mc_contcs.panelABasis],
    ["mc-counsmo", b_mc_counsmo.panelABasis],
    ["mc-cs", b_mc_cs.panelABasis],
    ["mc-ctpyart", b_mc_ctpyart.panelABasis],
    ["mc-cu", b_mc_cu.panelABasis],
    ["mc-culmc", b_mc_culmc.panelABasis],
    ["mc-cybscmo", b_mc_cybscmo.panelABasis],
    ["mc-datasc", b_mc_datasc.panelABasis],
    ["mc-ddensur", b_mc_ddensur.panelABasis],
    ["mc-desprod", b_mc_desprod.panelABasis],
    ["mc-dinfeng", b_mc_dinfeng.panelABasis],
    ["mc-dmed", b_mc_dmed.panelABasis],
    ["mc-dmktg", b_mc_dmktg.panelABasis],
    ["mc-dnce", b_mc_dnce.panelABasis],
    ["mc-doptom", b_mc_doptom.panelABasis],
    ["mc-dphysio", b_mc_dphysio.panelABasis],
    ["mc-dvetmed", b_mc_dvetmed.panelABasis],
    ["mc-eco", b_mc_eco.panelABasis],
    ["mc-ecosmc", b_mc_ecosmc.panelABasis],
    ["mc-ed", b_mc_ed.panelABasis],
    ["mc-edebt", b_mc_edebt.panelABasis],
    ["mc-eleceng", b_mc_eleceng.panelABasis],
    ["mc-engysys", b_mc_engysys.panelABasis],
    ["mc-enrslaw", b_mc_enrslaw.panelABasis],
    ["mc-ensysen", b_mc_ensysen.panelABasis],
    ["mc-entrpsp", b_mc_entrpsp.panelABasis],
    ["mc-env", b_mc_env.panelABasis],
    ["mc-enveng", b_mc_enveng.panelABasis],
    ["mc-envlaw", b_mc_envlaw.panelABasis],
    ["mc-envsc", b_mc_envsc.panelABasis],
    ["mc-evalo", b_mc_evalo.panelABasis],
    ["mc-filmtv", b_mc_filmtv.panelABasis],
    ["mc-finance", b_mc_finance.panelABasis],
    ["mc-finenh", b_mc_finenh.panelABasis],
    ["mc-foodpi", b_mc_foodpi.panelABasis],
    ["mc-gcclaw", b_mc_gcclaw.panelABasis],
    ["mc-gencoun", b_mc_gencoun.panelABasis],
    ["mc-genohlt", b_mc_genohlt.panelABasis],
    ["mc-geog", b_mc_geog.panelABasis],
    ["mc-geosc", b_mc_geosc.panelABasis],
    ["mc-gmcom", b_mc_gmcom.panelABasis],
    ["mc-hrmmo", b_mc_hrmmo.panelABasis],
    ["mc-humrlaw", b_mc_humrlaw.panelABasis],
    ["mc-ib", b_mc_ib.panelABasis],
    ["mc-ibl", b_mc_ibl.panelABasis],
    ["mc-indeng", b_mc_indeng.panelABasis],
    ["mc-inslead", b_mc_inslead.panelABasis],
    ["mc-intedib", b_mc_intedib.panelABasis],
    ["mc-intjour", b_mc_intjour.panelABasis],
    ["mc-ir", b_mc_ir.panelABasis],
    ["mc-is", b_mc_is.panelABasis],
    ["mc-it", b_mc_it.panelABasis],
    ["mc-journ", b_mc_journ.panelABasis],
    ["mc-jurisd", b_mc_jurisd.panelABasis],
    ["mc-larch", b_mc_larch.panelABasis],
    ["mc-larchud", b_mc_larchud.panelABasis],
    ["mc-larchup", b_mc_larchup.panelABasis],
    ["mc-li", b_mc_li.panelABasis],
    ["mc-mecheng", b_mc_mecheng.panelABasis],
    ["mc-mgmt", b_mc_mgmt.panelABasis],
    ["mc-mgmtact", b_mc_mgmtact.panelABasis],
    ["mc-mgmtafn", b_mc_mgmtafn.panelABasis],
    ["mc-mgmtein", b_mc_mgmtein.panelABasis],
    ["mc-mgmtfin", b_mc_mgmtfin.panelABasis],
    ["mc-mgmthre", b_mc_mgmthre.panelABasis],
    ["mc-mgmtmkt", b_mc_mgmtmkt.panelABasis],
    ["mc-mgmtscm", b_mc_mgmtscm.panelABasis],
    ["mc-mktcomm", b_mc_mktcomm.panelABasis],
    ["mc-mled", b_mc_mled.panelABasis],
    ["mc-mti", b_mc_mti.panelABasis],
    ["mc-mtrneng", b_mc_mtrneng.panelABasis],
    ["mc-musop", b_mc_musop.panelABasis],
    ["mc-musorp", b_mc_musorp.panelABasis],
    ["mc-muspt", b_mc_muspt.panelABasis],
    ["mc-ntcw", b_mc_ntcw.panelABasis],
    ["mc-nursc", b_mc_nursc.panelABasis],
    ["mc-phtypae", b_mc_phtypae.panelABasis],
    ["mc-phtyph", b_mc_phtyph.panelABasis],
    ["mc-privlaw", b_mc_privlaw.panelABasis],
    ["mc-prop", b_mc_prop.panelABasis],
    ["mc-propsyc", b_mc_propsyc.panelABasis],
    ["mc-propup", b_mc_propup.panelABasis],
    ["mc-psyched", b_mc_psyched.panelABasis],
    ["mc-pubcom", b_mc_pubcom.panelABasis],
    ["mc-scibif", b_mc_scibif.panelABasis],
    ["mc-scibio", b_mc_scibio.panelABasis],
    ["mc-scibit", b_mc_scibit.panelABasis],
    ["mc-sciche", b_mc_sciche.panelABasis],
    ["mc-sciear", b_mc_sciear.panelABasis],
    ["mc-sciepi", b_mc_sciepi.panelABasis],
    ["mc-scimat", b_mc_scimat.panelABasis],
    ["mc-sciphy", b_mc_sciphy.panelABasis],
    ["mc-scl", b_mc_scl.panelABasis],
    ["mc-scwr", b_mc_scwr.panelABasis],
    ["mc-socw", b_mc_socw.panelABasis],
    ["mc-softeng", b_mc_softeng.panelABasis],
    ["mc-spchpth", b_mc_spchpth.panelABasis],
    ["mc-spmed", b_mc_spmed.panelABasis],
    ["mc-surged", b_mc_surged.panelABasis],
    ["mc-tchecp", b_mc_tchecp.panelABasis],
    ["mc-teachec", b_mc_teachec.panelABasis],
    ["mc-teachpr", b_mc_teachpr.panelABasis],
    ["mc-teachsa", b_mc_teachsa.panelABasis],
    ["mc-teachsi", b_mc_teachsi.panelABasis],
    ["mc-tesol", b_mc_tesol.panelABasis],
    ["mc-thtr", b_mc_thtr.panelABasis],
    ["mc-thtrdir", b_mc_thtrdir.panelABasis],
    ["mc-thtrdra", b_mc_thtrdra.panelABasis],
    ["mc-thtrwri", b_mc_thtrwri.panelABasis],
    ["mc-tranint", b_mc_tranint.panelABasis],
    ["mc-uch", b_mc_uch.panelABasis],
    ["mc-upud", b_mc_upud.panelABasis],
    ["mc-urbdes", b_mc_urbdes.panelABasis],
    ["mc-urbhort", b_mc_urbhort.panelABasis],
    ["mc-urpl", b_mc_urpl.panelABasis],
    ["mc-vetstdr", b_mc_vetstdr.panelABasis],
    ["mc-ymhmo", b_mc_ymhmo.panelABasis],
    ["me-dcd", b_me_dcd.panelABasis],
    ["monash-a2000", b_monash_a2000.panelABasis],
    ["monash-b2001", b_monash_b2001.panelABasis],
    ["monash-c2004", b_monash_c2004.panelABasis],
    ["monash-c6009", b_monash_c6009.panelABasis],
    ["monash-e3001", b_monash_e3001.panelABasis],
    ["monash-l3001", b_monash_l3001.panelABasis],
    ["monash-m6024", b_monash_m6024.panelABasis],
    ["monash-s2000", b_monash_s2000.panelABasis],
    ["n01aa", b_n01aa.panelABasis],
    ["unsw-3502", b_unsw_3502.panelABasis],
    ["unsw-3970", b_unsw_3970.panelABasis],
    ["unsw-4461", b_unsw_4461.panelABasis],
    ["unsw-4701", b_unsw_4701.panelABasis],
    ["unsw-7002", b_unsw_7002.panelABasis],
    ["unsw-7003", b_unsw_7003.panelABasis],
    ["unsw-8351", b_unsw_8351.panelABasis],
    ["unsw-8646", b_unsw_8646.panelABasis],
    ["unsw-9045", b_unsw_9045.panelABasis],
    ["uq-2000", b_uq_2000.panelABasis],
    ["uq-2336", b_uq_2336.panelABasis],
    ["uq-2455", b_uq_2455.panelABasis],
    ["uq-2461", b_uq_2461.panelABasis],
    ["uq-2471", b_uq_2471.panelABasis],
    ["uq-2559", b_uq_2559.panelABasis],
    ["uq-5660", b_uq_5660.panelABasis],
    ["uq-5760", b_uq_5760.panelABasis],
    ["uq-5770", b_uq_5770.panelABasis],
    ["usyd-advanced-computing-commerce", b_usyd_advanced_computing_commerce.panelABasis],
    ["usyd-arts-extended", b_usyd_arts_extended.panelABasis],
    ["usyd-education", b_usyd_education.panelABasis],
    ["usyd-juris-doctor", b_usyd_juris_doctor.panelABasis],
    ["usyd-mba-technology-digital-strategy", b_usyd_mba_technology_digital_strategy.panelABasis],
    ["usyd-psychology-coaching", b_usyd_psychology_coaching.panelABasis],
    ["usyd-science-extended", b_usyd_science_extended.panelABasis],
    ["uwa-42520", b_uwa_42520.panelABasis],
    ["uwa-62530", b_uwa_62530.panelABasis],
    ["uwa-92550", b_uwa_92550.panelABasis],
    ["uwa-bh011", b_uwa_bh011.panelABasis],
    ["uwa-bp001", b_uwa_bp001.panelABasis],
    ["uwa-bp002", b_uwa_bp002.panelABasis],
    ["uwa-bp004", b_uwa_bp004.panelABasis],
  ] as const).filter(([, v]) => v !== null),
) as Record<string, V4PanelABasis>;

export const v4PanelABasisByCode = (code: string): V4PanelABasis | undefined =>
  V4_PANEL_A_BASIS[code.toLowerCase()];

export const v4OnlyProgramByCode = (code: string): V4OnlyProgram | undefined =>
  V4_ONLY_PROGRAMS[code.toLowerCase()];
